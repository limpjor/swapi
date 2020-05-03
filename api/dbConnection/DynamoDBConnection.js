/**
 * @module commons/dbConnection
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const { BusinessError } = require('lib-common/models');
const { HttpConstants, ErrorConstants } = require('lib-common/constants');

// const BATCH_OPERATIONk_MAX_LENGTH = 25;
const TRANSACTION_MAX_LENGTH = 10;

/**
 * @class
 * @requires AWS
 */
class DynamoDBConnection {
  /**
   * Método para ejecutar una operación en una tabla Dynamo
   * @static
   * @param {string} action acción a realizar
   * @param {object} params información necesaria para ejecutar la operación
   * @returns Objeto con la respuesta a la acción ejecutada
   */
  static async callSingleOperation(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    try {
      return await dynamoDb[action](params).promise();
    } catch (error) {
      console.error(error);
      throw new BusinessError({
        code: ErrorConstants.DB_ERROR.code,
        httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
        messages: error.message,
      });
    }
  }

  /**
   * Método para ejecutar un conjunto de operaciones en una tabla Dynamo
   * en una sola transacción (asíncrono)
   * @static
   * @param {string} action acción a realizar
   * @param {object} params información necesaria para ejecutar la operación
   * @param {number} backoffTime parametro para contar intentos(algoritmo de backoff)
   * @returns Objeto con la respuesta a la acción ejecutada
   */
  static async callBatchOperation(action, params, backoffTime = 1) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    try {
      return await dynamoDb[action](params).promise();
    } catch (error) {
      console.error(error);
      if (error.code === 'ProvisionedThroughputExceededException') {
        this._backoff(backoffTime);
        return this.callBatchOperation(action, params, (backoffTime * 2));
      }
      throw new BusinessError({
        code: ErrorConstants.DB_ERROR.code,
        httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
        messages: error.message,
      });
    }
  }

  static _backoff(time) {
    const ms = time * 100;
    const start = (new Date()).getTime();
    while (((new Date()).getTime() - start) < ms) {
      // esperando
    }
  }

  /**
   * Método para ejecutar un conjunto de operaciones en una tabla Dynamo
   * en una sola transacción (síncrono)
   * @static
   * @param {string} action acción a realizar
   * @param {object} params información necesaria para ejecutar la operación
   * @returns Objeto con la respuesta a la acción ejecutada
   */
  static async callTransaction(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    try {
      let paramsBlock = [];
      const transactionToCall = [];
      if (params.TransactItems) {
        if (params.TransactItems.length > TRANSACTION_MAX_LENGTH) {
          paramsBlock = this.buildRangesParams(params, TRANSACTION_MAX_LENGTH);
        } else {
          paramsBlock[0] = params.TransactItems;
        }
        paramsBlock.forEach((item) => {
          params.TransactItems = item;
          transactionToCall.push(dynamoDb[action](params).promise());
        });
      }
      return await Promise.all(transactionToCall);
    } catch (error) {
      console.error(error);
      throw new BusinessError({
        code: ErrorConstants.DB_ERROR.code,
        httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
        messages: error.message,
      });
    }
  }

  static buildRangesParams(array, cantItems) {
    const ranges = [];
    let loops = Math.floor(array.length / cantItems);
    if (array.length % cantItems > 0) loops += 1;
    for (let i = 0; i < loops; i += 1) {
      ranges.push(array.slice(cantItems * i, cantItems * (i + 1)));
    }
    return ranges;
  }
}

module.exports = DynamoDBConnection;

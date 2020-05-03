/* eslint-disable no-console */
const { BusinessError } = require('lib-common/models');
const { HttpConstants, ErrorConstants } = require('lib-common/constants');
const DynamoDBConnection = require('../dbConnection/DynamoDBConnection');
const {
  DB_ERROR_MESSAGES, IND_ACTIVO, COTIZACION_NO_UNICA_MSG, TRANSACCION_NO_EXISTE, ESTADO_TRANSACCION,
} = require('../AppConstants');
const crypto = require('../CryptoUtil');
const UtilError = require('./../UtilBusinessError');

class Db {
  static async getTxDynamo(payload) {
    try {
      const keyConExp = 'ideCotizacion = :ideCotizacion';
      const filterExp = this.obtenerFilterExpression(payload);
      const expAtrVal = this.obtenerExpressionAttributeValues(payload);
      const params = {
        TableName: process.env.DYNAMODB_TABLE_COTIZACION,
        KeyConditionExpression: keyConExp,
        FilterExpression: filterExp,
        ExpressionAttributeValues: expAtrVal,
      };
      return await DynamoDBConnection.callSingleOperation('query', params);
    } catch (error) {
      const messages = `${ErrorConstants.DB_ERROR.message} : ${DB_ERROR_MESSAGES.SELECT} DynamoDB.`;
      console.error(messages, error);
      throw new BusinessError({
        code: TRANSACCION_NO_EXISTE.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: (Object.assign(TRANSACCION_NO_EXISTE, { transaccion: payload.ideCotizacion })).msg,
      });
    }
  }

  static async getTransaccionActiva(payload) {
    const errorMessages = [];
    let resultCotizacion = [];
    try {
      resultCotizacion = await this.getTxDynamo(payload);
    } catch (error) {
      const messages = [`${error.messages} getTransaccionActiva`];
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: messages,
      });
    }
    const { decryptTer, decryptTerPel } = payload;
    if (resultCotizacion.Count > 0) {
      if (resultCotizacion.Count !== 1) errorMessages.push(COTIZACION_NO_UNICA_MSG);
      else {
        // Se desencripta Terceros
        if (decryptTer && typeof resultCotizacion.Items[0].terceros === 'string') {
          const decryptedTerceros = crypto.decryptAES256(resultCotizacion.Items[0].terceros,
            resultCotizacion.Items[0].ideCotizacion.split('-').reverse().join(''));
          resultCotizacion.Items[0].terceros = JSON.parse(decryptedTerceros);
        }
        // Se desencripta Terceros Pel
        if (decryptTerPel && typeof resultCotizacion.Items[0].tercerosPel === 'string') {
          const decryptedTercerosPel = crypto.decryptAES256(resultCotizacion.Items[0].tercerosPel,
            resultCotizacion.Items[0].ideCotizacion.split('-').reverse().join(''));
          resultCotizacion.Items[0].tercerosPel = JSON.parse(decryptedTercerosPel);
        }
        return resultCotizacion.Items[0];
      }
      throw new BusinessError({
        code: ErrorConstants.VALIDATION_ERROR.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: errorMessages,
      });
    } else {
      errorMessages.push((Object.assign(TRANSACCION_NO_EXISTE, { transaccion: payload.ideCotizacion })).msg);
      throw new BusinessError({
        code: TRANSACCION_NO_EXISTE.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: errorMessages,
      });
    }
  }

  static async guardarInstanciaDynamo(item) {
    let respuesta;
    try {
      const params = {
        TableName: process.env.DYNAMODB_TABLE_COTIZACION,
        Item: item,
      };
      respuesta = await DynamoDBConnection.callSingleOperation('put', params);
    } catch (error) {
      const messages = `${ErrorConstants.DB_ERROR.message} : ${DB_ERROR_MESSAGES.INSERT} 
                        Guardar Instancia Dynamo ${process.env.DYNAMODB_TABLE_COTIZACION}.`;
      console.error(messages, error);
      UtilError.throwInternalServerError();
    }
    return respuesta;
  }

  static obtenerFilterExpression(input) {
    let filterExp = '';
    filterExp = `${filterExp} indSeleccionado = :indSeleccionado `;
    if (!input.indNoValidarEstado) {
      filterExp = `${filterExp} and estado = :estado `;
    }
    if (input.idpTipoOper) {
      filterExp = `${filterExp} and idpTipoOper = :idpTipoOper `;
    }
    return filterExp;
  }

  static obtenerExpressionAttributeValues(input) {
    const expAttribVal = {};
    expAttribVal[':ideCotizacion'] = input.ideCotizacion;
    expAttribVal[':indSeleccionado'] = IND_ACTIVO;
    if (!input.indNoValidarEstado) {
      expAttribVal[':estado'] = ESTADO_TRANSACCION.ACTIVO;
    }
    if (input.idpTipoOper) {
      expAttribVal[':idpTipoOper'] = input.idpTipoOper;
    }
    return expAttribVal;
  }
}

module.exports = Db;

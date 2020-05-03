/* eslint-disable no-console */
const { ErrorConstants } = require('lib-common/constants');
const DatabaseConstants = require('./DataBaseConstants');
const { DB_ERROR_MESSAGES } = require('../AppConstants');
const ECDOnPremiseConnection = require('../dbConnection/ECDOnPremiseConnection');
const utilError = require('./../UtilBusinessError');
const DatosCanal = require('../models/DatosCanal');

class EcdDb {
  static async busquedaDatosCorredorCanal(user, input) {
    const datosCanal = new DatosCanal({});
    let connection = {};
    const bindvars = {
      ideCanal: user.data.ideCanal,
    };
    let result;
    let query = DatabaseConstants.OBTENER_DATOS_CORREDOR_CANAL;
    if (input.poliza) {
      query += ` AND A.REFEXTERNA = '${input.poliza}'`;
    } else {
      query += ` AND NUMERO = '${input.codigoPoliza}|${input.numeroPoliza}'`;
    }
    try {
      connection = await ECDOnPremiseConnection.getConnection();
      result = await ECDOnPremiseConnection.executeSQLStatement({
        connection: connection,
        statement: query,
        bindParams: bindvars,
        target: datosCanal,
      });
      console.log('*****busquedaDatosCorredorCanal', result);
      return result;
    } catch (error) {
      const messages = `${ErrorConstants.DB_ERROR.message}, ${DB_ERROR_MESSAGES.SELECT} Datos de AcselX.`;
      console.log(messages, error);
      utilError.throwGenericBusinessError();
    } finally {
      if (connection) {
        await ECDOnPremiseConnection.releaseConnection(connection);
      }
    }
    return result;
  }
}

module.exports = EcdDb;

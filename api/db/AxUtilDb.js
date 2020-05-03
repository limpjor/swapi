/* eslint-disable no-console */
const { BusinessError } = require('lib-common/models');
const { HttpConstants, ErrorConstants } = require('lib-common/constants');
const AcselXOnpremiseConnection = require('../../commons/dbConnection/AcselXOnpremiseConnection');
const {
  DB_ERROR_MESSAGES, INTERNAL_ERROR,
} = require('../AppConstants');
const DatabaseConstants = require('../../commons/db/DataBaseConstants');

class AxUtilDb {
  static async obtNumidDb(numeroDocumento, tipoDocumento, numid) {
    let connection;
    const bindvars = {};
    try {
      connection = await AcselXOnpremiseConnection.getConnection();
      DatabaseConstants.OBTENER_NUMID.numid = numid;
      DatabaseConstants.OBTENER_NUMID.tipoDocumento = tipoDocumento;
      DatabaseConstants.OBTENER_NUMID.numeroDocumento = numeroDocumento;
      const { query } = DatabaseConstants.OBTENER_NUMID;
      const result = await AcselXOnpremiseConnection.executeSQLStatement({
        connection: connection,
        statement: query,
        bindParams: bindvars,
        target: { NUMID: null, NUMIDDOC: null },
      });
      console.log('*****obtNumidDb', result);
      return result;
    } catch (error) {
      const messages = `${ErrorConstants.DB_ERROR.message}, ${DB_ERROR_MESSAGES.SELECT} Datos de AcselX.`;
      console.log(messages, error);
      throw new BusinessError({
        code: INTERNAL_ERROR.code,
        httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
        messages: INTERNAL_ERROR.message,
      });
    } finally {
      if (connection) {
        await AcselXOnpremiseConnection.releaseConnection(connection);
      }
    }
  }
}

module.exports = AxUtilDb;

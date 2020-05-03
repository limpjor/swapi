/* eslint-disable no-console */
const { BusinessError } = require('lib-common/models');
const { ErrorConstants } = require('lib-common/constants');
const DatabaseConstants = require('./DataBaseConstants');
const Parametro = require('../models/Parametro');
const { DB_ERROR_MESSAGES, IND_ACTIVO_S } = require('../AppConstants');
const ECDCloudConnection = require('../dbConnection/ECDCloudConnection');

class EcdDb {
  static async getParametro(payload) {
    const parametro = new Parametro({});
    try {
      let query = DatabaseConstants.OBTENER_OBT_PARAMETRO_C;
      let params = [payload.ideTipPar, payload.codigoC, IND_ACTIVO_S];
      if (payload.codigoN) {
        query = DatabaseConstants.OBTENER_OBT_PARAMETRO_N;
        params = [payload.ideTipPar, payload.codigoN, IND_ACTIVO_S];
      }
      const result = await ECDCloudConnection.executeSQL(query, params, parametro);
      return result;
    } catch (error) {
      const messages = [ErrorConstants.DB_ERROR.message, `${DB_ERROR_MESSAGES.SELECT} Parametro.`];
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: messages,
      });
    }
  }

  static async getParametroRefMig(payload) {
    const parametro = new Parametro({});
    try {
      const query = DatabaseConstants.OBTENER_OBT_PARAMETRO_REF_MIG;
      const params = [payload.ideTipPar, payload.refMigracion, IND_ACTIVO_S];
      const result = await ECDCloudConnection.executeSQL(query, params, parametro);
      return result.length > 0 ? result[0] : result;
    } catch (error) {
      const messages = [ErrorConstants.DB_ERROR.message, `${DB_ERROR_MESSAGES.SELECT} Parametro.`];
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: messages,
      });
    }
  }

  static async lstParametro(payload) {
    const parametro = new Parametro({});
    try {
      const query = DatabaseConstants.OBTENER_LISTA_PARAMETRO;
      const result = await ECDCloudConnection.executeSQL(query, [payload.ideTipPar, IND_ACTIVO_S], parametro);
      return result;
    } catch (error) {
      const messages = [ErrorConstants.DB_ERROR.message, `${DB_ERROR_MESSAGES.SELECT} Parametro.`];
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: messages,
      });
    }
  }
}

module.exports = EcdDb;

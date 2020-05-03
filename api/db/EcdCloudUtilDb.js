const { BusinessError } = require('lib-common/models');
const { ErrorConstants } = require('lib-common/constants');
const { HttpConstants } = require('lib-common/constants');
const ECDCloudConnection = require('../dbConnection/ECDCloudConnection');
const {
  DB_ERROR_MESSAGES, VALIDATION_DISTRITO, ERROR_PLAN_FINAN_TIPO_CLIENTE,
} = require('../AppConstants');
const { PTO_TIPOVIA, ERROR_TIPO_VIA } = require('../AppConstants');
const utilError = require('./../UtilBusinessError');
const DatabaseConstants = require('./DataBaseConstants');
const Distrito = require('../models/Distrito');
const Financiamiento = require('../models/Financiamiento');
const DatosCanal = require('../models/DatosCanal');
const Ecd = require('./EcdDb');


class EcdCloudUtilDb {
  static async obtenerDatosDistritoDB(tercero) {
    const distrito = new Distrito({});
    const query = DatabaseConstants.OBTENER_UBIGEO;
    try {
      const result = await ECDCloudConnection.executeSQL(query, [tercero], distrito);
      if (result.length === 0) {
        throw new BusinessError({
          code: VALIDATION_DISTRITO.code,
          httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
          messages: VALIDATION_DISTRITO.msg,
        });
      }
      return result;
    } catch (error) {
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: error.messages,
      });
    }
  }

  static async validaPlanFinanciamientoTipoClienteDb(idePlanFinanciamiento, tipoCliResponsablePago) {
    const financiamiento = new Financiamiento({});
    const query = DatabaseConstants.OBTENER_PLAN_FINAN_TIPO_CLI;
    try {
      const result = await ECDCloudConnection.executeSQL(query, [idePlanFinanciamiento, tipoCliResponsablePago], financiamiento);
      console.log(result);
      if (result.length === 0) {
        throw new BusinessError({
          code: ERROR_PLAN_FINAN_TIPO_CLIENTE.code,
          httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
          messages: ERROR_PLAN_FINAN_TIPO_CLIENTE.msg,
        });
      }
      return result;
    } catch (error) {
      const messages = [ErrorConstants.DB_ERROR.message, `${DB_ERROR_MESSAGES.SELECT} plan.`].concat(error.messages);
      console.error(messages, error);
      throw new BusinessError({
        code: ERROR_PLAN_FINAN_TIPO_CLIENTE.code,
        httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
        messages: messages,
      });
    }
  }

  static async busquedaDatosCanalUsuario(input) {
    const datosCanal = new DatosCanal({});
    const bindvars = [
      input.data.ideCanal,
    ];
    let result;
    const query = DatabaseConstants.OBTENER_DATOS_CANAL_USUARIO;
    try {
      result = await ECDCloudConnection.executeSQL(query, bindvars, datosCanal);
      console.log('*****busquedaDatosCanalUsuario', result);
      return result;
    } catch (error) {
      const messages = `${ErrorConstants.DB_ERROR.message}, ${DB_ERROR_MESSAGES.SELECT} Datos de ECD cloud.`;
      console.log(messages, error);
      utilError.throwGenericBusinessError();
    }
    return result;
  }

  static async obtTipoVia(dato) {
    try {
      const tipoVia = await Ecd.getParametro({ ideTipPar: PTO_TIPOVIA, codigoC: dato });
      console.log('----tipoVia ', tipoVia);
      if (tipoVia.length === 0) {
        throw new BusinessError({
          code: ERROR_TIPO_VIA.code,
          httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
          messages: ERROR_TIPO_VIA.msg,
        });
      }
      return tipoVia;
    } catch (error) {
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: error.messages,
      });
    }
  }
}
module.exports = EcdCloudUtilDb;

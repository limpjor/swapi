module.exports.DB_ERROR = { code: '000099', message: 'Ocurrió un error en la Base de Datos' };
module.exports.REQUEST_BODY_ERROR = { code: '000098', message: 'El cuerpo de la solicitud no tiene la estructura adecuado' };
module.exports.VALIDATION_ERROR = { code: '000097', description: 'Inputs Inválidos' };

module.exports.BAD_REQUEST_STATUS = { code: 400, description: 'BAD REQUEST' };
module.exports.INTERNAL_SERVER_ERROR_STATUS = { code: 500, description: 'INTERNAL SERVER ERROR' };

module.exports.DB_ERROR_MESSAGES = {
  SELECT: 'No se pudo obtener:',
  UPDATE: 'No se pudo actualizar:',
  INSERT: 'No se pudo insertar:',
};

module.exports.INTERNAL_ERROR = {
  message: 'Ocurrió un error durante el procesamiento del servicio.',
  code: '000001',
};

module.exports.VALIDATION_BUCA01 = {
  message: 'No se encontró datos del canal con los filtros ingresados.',
  code: 'BUCA01',
};

/* eslint-disable no-console */
'use strict';

const service = require('./service/Service');
class Controller {
  static async getfilms(event) {
    try {
      const result = await service.getfilms();
      return result;
    } catch (error) {
      return error;
    }
  }
}
module.exports = Controller;

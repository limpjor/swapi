const express = require('express');
const app = express;

class CommonService {
  static async getfilms() {
    app.post('https://swapi.py4e.com/api/films/',
     function (req, res) {
      console.log("res:",res);
    });
    
  }


}
module.exports = CommonService;

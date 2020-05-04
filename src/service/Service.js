const express = require('express');
const app = express;

class CommonService {
  static async getfilms() {
    await app.get('https://swapi.py4e.com/api/films/', function(req, res) {
      return res;
    });   
  }

  static async getPeople() {
    await app.get('https://swapi.py4e.com/api/people/', function(req, res) {
      return res;
    });   
  }

  static async getPlanets() {
    await app.get('https://swapi.py4e.com/api/planets/', function(req, res) {
      return res;
    });   
  }

  static async getSpecies() {
    await app.get('https://swapi.py4e.com/api/species/', function(req, res) {
      return res;
    });   
  }

  static async getStarships() {
    await app.get('https://swapi.py4e.com/api/vehicles/', function(req, res) {
      return res;
    });   
  }

  static async getVehicles() {
    await app.get('https://swapi.py4e.com/api/people/1/', function(req, res) {
      return res;
    });   
  }

}
module.exports = CommonService;

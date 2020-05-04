const service = require('./service/Service');

 module.exports.getFilms = async (event, context, callback) => {
  let response;
  try {
    response = await service.getfilms();
  } catch (error) {
    
  }

  callback(null, response);
};

module.exports.getPeople = async (event, context, callback) => {
  let response;
  try {
    response = await service.getPeople();
  } catch (error) {
    
  }

  callback(null, response);
};

module.exports.getPlanets = async (event, context, callback) => {
  let response;
  try {
    response = await service.getPlanets();
  } catch (error) {
    
  }

  callback(null, response);
};

module.exports.getSpecies = async (event, context, callback) => {
  let response;
  try {
    response = await service.getSpecies();
  } catch (error) {
    
  }

  callback(null, response);
};

module.exports.getStarships = async (event, context, callback) => {
  let response;
  try {
    response = await service.getStarships();
  } catch (error) {
    
  }

  callback(null, response);
};

module.exports.getVehicles = async (event, context, callback) => {
  let response;
  try {
    response = await service.getVehicles();
  } catch (error) {
    
  }

  callback(null, response);
};


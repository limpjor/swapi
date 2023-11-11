const SwapInfoService= require('../services/swapInfoService')
const Request = require('../model/requestModel')
const planets = require('../model/planetsModel')
const Utils = require('../utils/utils');

const swapInfoService = new SwapInfoService();
const getPlanetsSwapi = async (event) => {
    try {
        const {id} = event.pathParameters;
        const data = await swapInfoService.getPlanetsInfoSwapiService(id);
        //const utils = new Utils();
        return new Request(
            200,
            JSON.stringify(Utils.translate(data))
        );
    } catch (error) {
        return new Request(500, JSON.stringify({message: error.message}));
    }
};


const getPlanetsAws = async (event) => {
    try {
        const {id} = event.pathParameters;
        const body = await swapInfoService.getPlanetsInfoAwsService(id);
        return new Request(
            200,
            body
        );
    } catch (error) {
        return new Request(500, JSON.stringify({message: error.message}));
    }
};


const newPlanetAws = async (event) => {
    try {
        planets.validate(event.body);
        await swapInfoService.newPlanetsInfoAwsService(event.body);
        return new Request(
            200,
            'Registro guardado con exito.'
        );
    } catch (error) {
        return new Request(500, JSON.stringify({message: error.message}));
    }
};

module.exports = {
    getPlanetsSwapi: getPlanetsSwapi,
    getPlanetsAws: getPlanetsAws,
    newPlanetAws: newPlanetAws
};

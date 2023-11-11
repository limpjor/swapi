const { expect,describe,test } = require('@jest/globals');
const {
    getPlanetsSwapi,
    getPlanetsAws,
    newPlanetAws
} = require('../../src/controller/swapController');
const Request = require('../../src/model/requestModel');
const PlanetsModel = require('../../src/model/planetsModel');

describe('Pruebas para las funciones', () => {
    test('getPlanetsSwapi debe manejar un evento y devolver un Request', async () => {
        const mockEvent = {
            pathParameters: { id: 1 }
        };
        const result = await getPlanetsSwapi(mockEvent);
        expect(result).toBeInstanceOf(Request);
    });

    test('getPlanetsAws debe manejar un evento y devolver un Request', async () => {
        const mockEvent = {
            pathParameters: { id: 1 }
        };

        const result = await getPlanetsAws(mockEvent);
        expect(result).toBeInstanceOf(Request);
    });

    test('newPlanetAws debe manejar un evento y devolver un Request', async () => {
        const mockEvent = {
            body: { /* Supongamos que es un cuerpo de request válido */ }
        };
        const result = await newPlanetAws(mockEvent);
        expect(result).toBeInstanceOf(Request);
    });
});

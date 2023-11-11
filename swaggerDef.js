const path = require('path');

module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nombre de tu API',
            version: '1.0.0',
            description: 'Descripción de tu API',
        },
    },
    apis: [path.resolve(__dirname, 'src/controladores/*.ts')],
};

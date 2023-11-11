const fs = require('fs');
const path = require('path');

const documentationHandler = async () => {
    const rawSwagger = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'));
    const swaggerDocument = JSON.parse(rawSwagger);

    return {
        statusCode: 200,
        body: JSON.stringify(swaggerDocument),
    };
};

module.exports = { documentationHandler };

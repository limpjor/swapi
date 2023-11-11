const Joi = require('@hapi/joi');


const planets = Joi.object({
    id: Joi.number().integer().required(),
    nombre: Joi.string(),
    altura: Joi.number().integer(),
    masa: Joi.number().integer(),
    color_cabello: Joi.string(),
    color_piel: Joi.string(),
    color_ojos: Joi.string(),
    anio_nacimiento: Joi.string(),
    sexo: Joi.string(),
    mundo_natal: Joi.string(),
    peliculas: Joi.array().items(Joi.string()),
    especies: Joi.array().items(Joi.string()),
    vehiculo: Joi.array().items(Joi.string()),
    naves_estelares: Joi.array().items(Joi.string()),
    creado: Joi.date().iso(),
    editado: Joi.date().iso(),
    url: Joi.string()
});

module.exports = planets;
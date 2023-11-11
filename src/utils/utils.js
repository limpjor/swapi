class Utils {
    constructor() {
    }
    static translate(body) {
        console.log("body:",body)
        return {
            'nombre': body.name,
            'altura': body.height,
            'masa': body.mass,
            'color_cabello': body.hair_color,
            'color_piel': body.skin_color,
            'color_ojos': body.eye_color,
            'anio_nacimiento': body.birth_year,
            'sexo': body.gender,
            'mundo_natal': body.homeworld,
            'peliculas': body.films,
            'especies': body.species,
            'vehiculo': body.vehicles,
            'naves_estelares': body.starships,
            'creado': body.created,
            'editado': body.edited,
            'url': body.url
        }
    }

}

module.exports = Utils;
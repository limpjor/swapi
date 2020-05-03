class Parametro {
  constructor({
    idePar = undefined,
    codigoC = undefined,
    codigoN = undefined,
    abreviatura = undefined,
    descripcion = undefined,
    descripcion2 = undefined,
    refMigracion = undefined,
  }) {
    this.idePar = idePar;
    this.codigoC = codigoC;
    this.codigoN = codigoN;
    this.abreviatura = abreviatura;
    this.descripcion = descripcion;
    this.descripcion2 = descripcion2;
    this.refMigracion = refMigracion;
  }
}

module.exports = Parametro;

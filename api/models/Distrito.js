class Distrito {
  constructor({
    IDEDISTRITO = undefined,
    IDEPAIS = undefined,
    IDEDEPARTAMENTO = undefined,
    IDEPROVINCIA = undefined,
    DSCDISTRITO = undefined,
    UBIGEO = undefined,
    DSCPAIS = undefined,
  }) {
    this.ideDistrito = IDEDISTRITO;
    this.idePais = IDEPAIS;
    this.ideDepartamento = IDEDEPARTAMENTO;
    this.ideProvincia = IDEPROVINCIA;
    this.dscDistrito = DSCDISTRITO;
    this.ubiGeo = UBIGEO;
    this.dscPais = DSCPAIS;
  }
}

module.exports = Distrito;

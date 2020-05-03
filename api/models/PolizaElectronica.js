class PolizaElectronica {
  constructor({
    contratante = undefined,
    asegurado = undefined,
  }) {
    this.contratante = contratante;
    this.asegurado = asegurado;
  }
}

module.exports = PolizaElectronica;

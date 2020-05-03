module.exports = class {
  constructor({
    ruc = undefined,
    porcentajeParticipacion = undefined,
    montoEndoso = undefined,
  }) {
    this.ruc = ruc;
    this.porcentajeParticipacion = porcentajeParticipacion;
    this.monto = montoEndoso;
  }
};

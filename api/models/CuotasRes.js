module.exports = class {
  constructor({
    numGiro = undefined,
    mtoGiro = undefined,
    fecVcto = undefined,
  }) {
    this.cuota = numGiro;
    this.monto = mtoGiro;
    this.fechaVencimiento = fecVcto;
  }
};

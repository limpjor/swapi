module.exports = class {
  constructor({
    tipo = undefined,
    monto = undefined,
    porcentaje = undefined,
    primaNetaInicial = undefined,
  }) {
    this.tipo = tipo;
    this.monto = monto;
    this.porcentaje = porcentaje;
    this.primaNetaInicial = primaNetaInicial;
  }
};

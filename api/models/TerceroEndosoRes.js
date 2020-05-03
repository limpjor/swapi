module.exports = class {
  constructor({
    apeMaterno = undefined,
    apePaterno = undefined,
    nombre = undefined,
    numeroDocumento = undefined,
    tipoDocumento = undefined,
  }) {
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.apellidoMaterno = apeMaterno;
    this.apellidoPaterno = apePaterno;
    this.nombres = nombre;
  }
};

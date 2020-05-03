module.exports = class {
  constructor({
    apeMaterno = undefined,
    apePaterno = undefined,
    correo = undefined,
    fecNacimiento = undefined,
    ideTercero = undefined,
    nombre = undefined,
    nombreVia = undefined,
    numeroDocumento = undefined,
    numeroVia = undefined,
    telefono = undefined,
    tipoDocumento = undefined,
    tipoVia = undefined,
    sexo = undefined,
    ubigeo = undefined,
    dscDistrito = undefined,
  }) {
    this.tercero = ideTercero;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.apellidoMaterno = apeMaterno;
    this.apellidoPaterno = apePaterno;
    this.nombres = nombre;
    this.fechaNacimiento = fecNacimiento;
    this.sexo = sexo;
    this.tipoVia = tipoVia;
    this.nombreVia = nombreVia;
    this.numeroVia = numeroVia;
    this.distrito = ubigeo;
    this.nombreDistrito = dscDistrito;
    this.correo = correo;
    this.telefono = telefono;
  }
};

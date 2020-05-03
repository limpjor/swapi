class PersonaNatural {
  constructor({
    tipoDocumento = undefined,
    numeroDocumento = undefined,
    apellidoPaterno = undefined,
    apellidoMaterno = undefined,
    nombres = undefined,
    sexo = undefined,
    fechaNacimiento = undefined,

  }) {
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.apeTer = apellidoPaterno;
    this.apeMatter = apellidoMaterno;
    this.nomTer = nombres;
    this.sexo = sexo;
    this.fecNac = fechaNacimiento;
  }
}

module.exports = PersonaNatural;

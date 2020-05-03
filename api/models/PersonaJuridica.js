class PersonaJuridica {
  constructor({
    tipoDocumento = undefined,
    numeroDocumento = undefined,
    apellidoPaterno = undefined,
    nombres = undefined,
    fechaNacimiento = undefined,

  }) {
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.apeTer = apellidoPaterno;
    this.nomTer = nombres;
    this.fecNac = fechaNacimiento;
  }
}

module.exports = PersonaJuridica;

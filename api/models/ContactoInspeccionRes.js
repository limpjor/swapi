module.exports = class {
  constructor({
    personaContacto = undefined,
    mailContacto = undefined,
    telefonoContacto = undefined,
  }) {
    this.nombre = personaContacto;
    this.correo = mailContacto;
    this.telefono = telefonoContacto;
  }
};

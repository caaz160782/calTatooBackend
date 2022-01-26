const { existEmail } = require("../usecases/verifica.js");

const nameNull = async (req, res, next) => {
  const userData = req.body;
  const { name } = userData;
  if (name === "") {
    return res.status(404).json({
      code: "NAME_EMPTY",
      error: "Name Empty",
    });
  } else {
    next();
  }
};

const lastNameNull = async (req, res, next) => {
  const userData = req.body;
  const { lastName } = userData;
  if (lastName === "") {
    return res.status(404).json({
      code: "LASTNAME_EMPTY",
      error: "Last Name Empty",
    });
  } else {
    next();
  }
};

const idNull = async (req, res, next) => {
  const userData = req.body;
  const { idRole } = userData;
  if (idRole === "") {
    return res.status(404).json({
      code: "IDROLE_EMPTY",
      error: "Id Role Empty",
    });
  } else {
    next();
  }
};

const pswDefinition = async (req, res, next) => {
  const userData = req.body;
  const { password } = userData;
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/;
  if (password.match(regex) === null) {
    return res.status(404).json({
      code: "WRONG_PASSWORD",
      error: "password no valido",
      message:
        "el password debe tener un mínimo de 8 caracteres, incluidos un número, mayúscula, minúscula y un carácter especial",
    });
  } else {
    next();
  }
};

const emailVerifiqued = async (req, res, next) => {
  const userData = req.body;
  const { email } = userData;
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email === "") {
    return res.status(404).json({
      code: "EMAIL_EMPTY",
      error: "Email Empty ",
      message: "email is empty",
    });
  } else {
    if (email.match(regex) === null) {
      return res.status(404).json({
        code: "EMAIL_PASSWORD",
        error: "Email incorrect format",
      });
    } else {
      next();
    }
  }
};

const defPhoneNumber = async (req, res, next) => {
  const userData = req.body;
  const { phoneHome } = userData;
  if (phoneHome.length === 10) {
    next();
  } else {
    return res.status(404).json({
      code: "FORMAT_HOMEPHONE_WRONG",
      message: "the Home Phone It's not valid",
      error: "numero de telefono  invalido",
    });
  }
};

const defphonePersonal = async (req, res, next) => {
  const userData = req.body;
  const { phonePersonal } = userData;
  if (phonePersonal.length === 10) {
    next();
  } else {
    return res.status(404).json({
      code: "FORMAT_CELPHONE_WRONG",
      message: "the Celphone  It's not valid",
      error: "numero de telefono personal invalido",
    });
  }
};

const defCurp = async (req, res, next) => {
  const userData = req.body;
  const { curp } = userData;
  const regex =
    /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;

  if (curp.match(regex) === null) {
    return res.status(404).json({
      code: "CURP_WRONG",
      message: "el formato del curp es incorrecto",
      error: "el formato del curp es incorrecto",
    });
  } else {
    next();
  }
};

const defRfc = async (req, res, next) => {
  const userData = req.body;
  const { rfc } = userData;
  const regex =
    /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;

  if (rfc.match(regex) === null) {
    return res.status(404).json({
      code: "RFC_WRONG",
      message: "el formato del rfc es incorrecto",
      error: "el formato del rfc es incorrecto",
    });
  } else {
    next();
  }
};

const verifiedAge = async (req, res, next) => {
  const clientData = req.body;
  const { age } = clientData;
  if (age >= 18) {
    next();
  } else {
    return res.status(404).json({
      message: "No eres mayor de edad",
      error: "No eres mayor de edad",
      code: "AGE_WRONG",
    });
  }
};

module.exports = {
  nameNull,
  lastNameNull,
  idNull,
  pswDefinition,
  emailVerifiqued,
  defPhoneNumber,
  defphonePersonal,
  defCurp,
  defRfc,
  verifiedAge,
};

const idNull = async (req, res, next) => {
  const studioData = req.body;
  const { id_user } = studioData;
  if (id_user === "") {
    return res.status(404).json({
      code: "IDUSER_EMPTY",
      error: "Id User Empty",
      message: "No puede estar vacio ",
    });
  } else {
    next();
  }
};

const nameNull = async (req, res, next) => {
  const studioData = req.body;
  const { name } = studioData;
  if (name === "") {
    return res.status(404).json({
      code: "NAME_EMPTY",
      error: "Name Empty",
      message: "Nombre Estudio Vacio",
    });
  } else {
    next();
  }
};

const descriptionNull = async (req, res, next) => {
  const studioData = req.body;
  const { description } = studioData;
  if (description === "") {
    return res.status(404).json({
      code: "Description_EMPTY",
      error: "description Empty",
      message: "description  Vacio",
    });
  } else {
    next();
  }
};

const cpNull = async (req, res, next) => {
  const studioData = req.body;
  const { postalCode } = studioData;
  if (postalCode === "") {
    return res.status(404).json({
      code: "CP_EMPTY",
      error: "CP Empty",
      message: "Cp vacio",
    });
  } else {
    next();
  }
};

const municipioNull = async (req, res, next) => {
  const studioData = req.body;
  const { municipality } = studioData;
  if (municipality === "") {
    return res.status(404).json({
      code: "MUNICIPIO_EMPTY",
      error: "MUNICIPIO Empty",
      message: "MUNICIPIO Empty",
    });
  } else {
    next();
  }
};

const estadoNull = async (req, res, next) => {
  const studioData = req.body;
  const { state } = studioData;
  if (state === "") {
    return res.status(404).json({
      code: "STATE_EMPTY",
      error: "State Empty",
      message: "State Empty",
    });
  } else {
    next();
  }
};

const cityNull = async (req, res, next) => {
  const studioData = req.body;
  const { city } = studioData;
  if (city === "") {
    return res.status(404).json({
      code: "CITY_EMPTY",
      error: "City Empty",
      message: "City Empty",
    });
  } else {
    next();
  }
};

const dirNull = async (req, res, next) => {
  const studioData = req.body;
  const { address } = studioData;
  if (address === "") {
    return res.status(404).json({
      code: "address_EMPTY",
      error: "address Empty",
      message: "address Empty",
    });
  } else {
    next();
  }
};

const defPhoneStudio = async (req, res, next) => {
  const studioData = req.body;
  const { phoneStudio } = studioData;
  if (phoneStudio.length === 10) {
    next();
  } else if (phoneStudio.length === 0) {
    return res.status(404).json({
      code: "STUDIOPHONE EMPTY",
      error: "STUDIOPHONE EMPTY",
      message: "STUDIO Phone It's Empty",
    });
  } else {
    return res.status(404).json({
      code: "FORMAT_STUDIOPHONE_WRONG",
      error: "STUDIOPHONE_WRONG",
      message: "the STUDIO Phone It's not valid",
    });
  }
};

const defWhatsapp = async (req, res, next) => {
  const studioData = req.body;
  const { phoneWhatsApp } = studioData;
  if (phoneWhatsApp.length === 10) {
    next();
  } else if (phoneWhatsApp.length === 0) {
    return res.status(404).json({
      code: "WhatsApp EMPTY",
      error: "WhatsApp EMPTY",
      message: "the WhatsApp  It's EMPTY",
    });
  } else {
    return res.status(404).json({
      code: "FORMAT_WhatsApp_WRONG",
      error: "WhatsApp_WRONG",
      message: "the WhatsApp  It's not valid",
    });
  }
};

const defRfc = async (req, res, next) => {
  const studioData = req.body;
  const { rfc } = studioData;
  const regex =
    /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
  if (rfc.match(regex) === null) {
    return res.status(404).json({
      code: "RFC_WRONG",
      message: "rfc format is not correct",
      message: "the RFC  It's not valid",
    });
  } else {
    next();
  }
};

module.exports = {
  idNull,
  nameNull,
  descriptionNull,
  cpNull,
  municipioNull,
  estadoNull,
  cityNull,
  dirNull,
  defPhoneStudio,
  defWhatsapp,
  defRfc,
};

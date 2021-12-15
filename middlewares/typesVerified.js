const pswDefinition = async (req, res, next) => {
  const userData = req.body;
  const { password } = userData;
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/;

  if (password.match(regex) === null) {
    return res.status(404).json({
      length: "minimum of 8 characters",
      mustContain: "including number, Upper, Lower And one special character",
    });
  }else{
   next();
  }
};

const defPhoneNumber = async (req, res, next) => {
    const userData = req.body;
    const { phoneHome } = userData;
    if (phoneHome.length === 12) {
        next();
    }
    else{
        return res.status(404).json({
            message: "the Home Phone It's not valid",
          });
    }
  };

  const defphonePersonal = async (req, res, next) => {
    const userData = req.body;
    const { phonePersonal } = userData;
    if (phonePersonal.length === 12) {
        next();
    }
    else{
        return res.status(404).json({
            message: "the Celphone  It's not valid",
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
          length: "curp format is not correct",
        });
      }
      else{
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
          length: "rfc format is not correct",
        });
      }
      else{
       next();
    }
  };

  const verifiedAge = async (req, res, next) => {
    const clientData = req.body;
    const { age } = clientData;
    if ( age <= 18) {
        next();
    }
    else{
        return res.status(404).json({
            message: "No eres mayor de edad",
          });
    }
  };

  
module.exports = { pswDefinition,defPhoneNumber,defphonePersonal,defCurp,defRfc,verifiedAge};

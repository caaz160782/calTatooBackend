const jwt=require("../lib/jwt");

const isAdmin=(req, res,next)=>{
    const {apitoken}=req.headers;
    const verify = jwt.verify(apitoken);
    const {rol}= verify;
    if(rol === "Administrador"){
         next();
    }else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }
};

module.exports={isAdmin}
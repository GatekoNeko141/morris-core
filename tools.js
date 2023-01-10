const jwt = require("jsonwebtoken")

exports.validateSesion = async (req, res) => {
  let response = false
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY, (error, authData) => {
    if(!error){
      response = true
    }else{
      response = false
    }
  })
  return response
}
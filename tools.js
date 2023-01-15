const jwt = require("jsonwebtoken")

exports.userValidator = async (req, res, table, action) => {
  let response = false
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY, (error, authData) => {
    if(!error){
      if(authData.permissions[table][action] != 0){
        response = true
      }else{
        response = false
      }
    }else{
      response = false
    }
  })
  return response
}

exports.generateRandomString = async (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result1 = ''
  const charactersLength = characters.length
  for (let i = 0; i < num; i++) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result1
}
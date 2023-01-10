const jwt = require("jsonwebtoken")
const crypt = require('bcryptjs')
const conn = require("./db")
const { promisify } = require("util")

const tools = require("./tools")

exports.register = async (req, res) => {
  console.log(req.body)
  const user = req.body.user
  const email = req.body.email
  const password = await crypt.hash(req.body.password, 8)
  let sql = "INSERT INTO users SET ?"
  conn.query(sql, {user:user, email:email, password:password}, (err, result) => {
    if(err) throw err
    res.status(200).json({message: "Usuario Registrado"})
  })
}

exports.login = async (req, res) => {
  const user = req.body.user
  const password = req.body.password

  let sql = "SELECT * FROM users WHERE user = ?"
  conn.query(sql, [user], async (err, result) => {
    if(result.length != 0){
      if(!(await crypt.compare(password, result[0].password))){
        res.status(404).json({message: "La contraseña ingresada es Incorrecta"})
      }else{
        const userJson = {
          id: result[0].id,
          user: result[0].user,
          email: result[0].email,
        }
        const token = jwt.sign(userJson, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_TIME_SESSION})

        const cookiesOptions = {
          expiresIn: new Date(Date.now()+process.env.JWT_TIME_COOKIE),
          maxAge: process.env.JWT_TIME_COOKIE * 1000,
          httpOnly: true
        }
        
        res.cookie('jwt', token, cookiesOptions)
        
        res.status(200).json({
          user: userJson,
          token: token
        })
      }
    }else{
      res.status(404).json({message: "Usuario no registrado"})
    }
  })
}

exports.isAuth = async (req, res) => {
  if(req.cookies.jwt){
    try {
      const decode = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET_KEY)
      let sql = "SELECT * FROM users WHERE user = ?"
      conn.query(sql, [decode.user], async (err, result) => {
        res.status(200).json({
          user: result[0].user,
          email: result[0].email
        })
      })
    } catch (error) {
      res.status(404).json({message: "Error de autenticación", error})
    }
  }else{
    res.status(404).json({message: "Usuario no autenticado"})
  }
}

exports.logout = async (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({message: "logout"})
}

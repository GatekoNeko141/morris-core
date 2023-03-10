const jwt = require("jsonwebtoken")
const crypt = require('bcryptjs')
const conn = require("./db")
const { promisify } = require("util")

const tools = require("./tools")

exports.register = async (req, res) => {
  const dataUser = {
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    user_name: req.body.user_name,
    email: req.body.email,
    password: await crypt.hash(req.body.password, 8),
    token_verify: await tools.generateRandomString(20),
    id_status: 1,
    id_type_user: 3
  }

  let sqlSelect = "SELECT id_user FROM users WHERE user_name = ?"
  conn.query(sqlSelect, [dataUser.user_name], (err, result) => {
    if(err) throw err
    if(result.length > 0){
      res.status(200).json({message: "El usuario ya existe"})
    }else{
      let sql = "INSERT INTO users SET ?"
      conn.query(sql, dataUser, (err, result) => {
        if(err) throw err
        res.status(200).json({message: "Usuario Registrado"})
      })
    }
  })
}

exports.login = async (req, res) => {
  const user_name = req.body.user_name
  const password = req.body.password

  let sql = "SELECT * FROM users WHERE user_name = ?"
  conn.query(sql, [user_name], async (err, result) => {
    if(err) throw res.status(404).json({error: err})
    if(result.length != 0){
      if(!(await crypt.compare(password, result[0].password))){
        res.status(404).json({message: "La contraseña ingresada es Incorrecta"})
      }else{
        conn.query("CALL getUserPermission(?)", result[0].id_user, (err, resProcedure) => {
          if(err) throw res.status(404).json({error: err})
          let userJson = {
            id_user: result[0].id_user,
            nombres: result[0].nombres,
            apellidos: result[0].apellidos,
            user_name: result[0].user_name,
            email: result[0].email,
            id_status: result[0].id_status,
            id_type_user: result[0].id_type_user,
            permissions: {}
          }
          resProcedure[0].forEach(tables => {
            userJson.permissions[tables.tabla] = {
              can_create: tables.can_create,
              can_read: tables.can_read,
              can_update: tables.can_update,
              can_delete: tables.can_delete
            }
          })
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
      let sql = "SELECT * FROM users WHERE user_name = ?"
      conn.query(sql, [decode.user_name], async (err, result) => {
        if(err) throw res.status(404).json({error: err})
        res.status(200).json({
          nombres: result[0].nombres,
          apellidos: result[0].apellidos,
          user_name: result[0].user_name,
          email: result[0].email,
          id_status: result[0].id_status,
          id_type_user: result[0].id_type_user,
          permissions: decode.permissions
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

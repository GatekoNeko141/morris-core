const db = require("../db")
const tools = require("../tools")
const crypt = require('bcryptjs')

exports.read = async (req, res) =>{
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "users", "can_read")
    if(canExcecute){
      let sql = "SELECT id_user, nombres, apellidos, user_name, email, created, modified, id_status FROM users WHERE id_type_user > 2"
      conn.query(sql, (err, result) => {
        res.status(200).json(result)
      })
    }else{
      res.status(403).json({message: "Acceso denegado"})
    }
  
    conn.end()
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error })
  }
}

exports.read_one = async (req, res) =>{
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "users", "can_read")
    if(canExcecute){
      let sql = "SELECT id_user, nombres, apellidos, user_name, email, created, modified, id_status FROM users WHERE id_user = ? AND id_type_user > 2"
      conn.query(sql, [req.params.id_user], (err, result) => {
        if(result.length > 0){
          res.status(200).json(result)
        }else{
          res.status(404).json({message: "Registro no encontrado"})
        }
      })
    }else{
      res.status(403).json({message: "Acceso denegado"})
    }
  
    conn.end()
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error })
  }
}

exports.create = async (req, res) => {
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "users", "can_create")
    if(canExcecute){
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
        if(result.length > 0){
          res.status(200).json({message: "El usuario ya existe"})
        }else{
          let sql = "INSERT INTO users SET ?"
          conn.query(sql, dataUser, (err, result) => {
            res.status(200).json({message: "Registro agregado"})
          })
        }
      })
    }else{
      res.status(403).json({message: "Acceso denegado"})
    }
  
    conn.end()
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error })
  }
}

exports.update = async (req, res) =>{
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "users", "can_update")
    if(canExcecute){
  
      const dataUser = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        user_name: req.body.user_name,
        email: req.body.email
      }
  
      let sql = "UPDATE users SET ? WHERE id_user = ? AND id_type_user > 2"
      conn.query(sql, [dataUser, req.params.id_user], (err, result) => {
        res.status(200).json({message: "Registro actualizado"})
      })
    }else{
      res.status(403).json({message: "Acceso denegado"})
    }
  
    conn.end()
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error })
  }
}

exports.delete = async (req, res) =>{
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "users", "can_delete")
    if(canExcecute){
      let sql = "DELETE FROM users WHERE id_user = ? AND id_type_user > 2"
      conn.query(sql, [req.params.id_user], (err, result) => {
        if(result.affectedRows > 0){
          res.status(200).json({message: "Registro eliminado"})
        }else{
          res.status(404).json({message: "Registro no encontrado"})
        }
      })
    }else{
      res.status(403).json({message: "Acceso denegado"})
    }
  
    conn.end()
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error })
  }
}

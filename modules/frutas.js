const db = require("../db")
const tools = require("../tools")

exports.read = async (req, res) =>{
  try{
    const conn = db.connect()
  
    const canExcecute = await tools.userValidator(req, res, "frutas", "can_read")
    if(canExcecute){
      let sql = "SELECT * FROM frutas"
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
  
    const canExcecute = await tools.userValidator(req, res, "frutas", "can_read")
    if(canExcecute){
      let sql = "SELECT * FROM frutas WHERE id_fruta = ?"
      conn.query(sql, [req.params.id_fruta], (err, result) => {
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
  
    const canExcecute = await tools.userValidator(req, res, "frutas", "can_create")
    if(canExcecute){
      let sql = "INSERT INTO frutas SET ?"
      conn.query(sql, [req.body], (err, result) => {
        res.status(200).json({message: "Registro agregado"})
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
  
    const canExcecute = await tools.userValidator(req, res, "frutas", "can_update")
    if(canExcecute){
      let sql = "UPDATE frutas SET ? WHERE id_fruta = ?"
      conn.query(sql, [req.body, req.params.id_fruta], (err, result) => {
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
  
    const canExcecute = await tools.userValidator(req, res, "frutas", "can_delete")
    if(canExcecute){
      let sql = "DELETE FROM frutas WHERE id_fruta = ?"
      conn.query(sql, [req.params.id_fruta], (err, result) => {
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

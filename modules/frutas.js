const db = require("../db")
const tools = require("../tools")

const conn = db.connect()

exports.read = async (req, res) =>{
  const canExcecute = await tools.userValidator(req, res, "frutas", "can_read")
  if(canExcecute){
    let sql = "SELECT * FROM frutas"
    conn.query(sql, (err, result) => {
      if(err) throw res.status(404).json({error: err})
      res.status(200).json(result)
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.read_one = async (req, res) =>{
  const canExcecute = await tools.userValidator(req, res, "frutas", "can_read")
  if(canExcecute){
    let sql = "SELECT * FROM frutas WHERE id_fruta = ?"
    conn.query(sql, [req.params.id_fruta], (err, result) => {
      if(err) throw res.status(404).json({error: err})
      if(result.length > 0){
        res.status(200).json(result)
      }else{
        res.status(404).json({message: "Registro no encontrado"})
      }
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.create = async (req, res) => {
  const canExcecute = await tools.userValidator(req, res, "frutas", "can_create")
  if(canExcecute){
    let sql = "INSERT INTO frutas SET ?"
    conn.query(sql, [req.body], (err, result) => {
      if(err) throw res.status(404).json({error: err})
      res.status(200).json({message: "Registro agregado"})
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.update = async (req, res) =>{
  const canExcecute = await tools.userValidator(req, res, "frutas", "can_update")
  if(canExcecute){
    let sql = "UPDATE frutas SET ? WHERE id_fruta = ?"
    conn.query(sql, [req.body, req.params.id_fruta], (err, result) => {
      if(err) throw res.status(404).json({error: err})
      res.status(200).json({message: "Registro actualizado"})
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.delete = async (req, res) =>{
  const canExcecute = await tools.userValidator(req, res, "frutas", "can_delete")
  if(canExcecute){
    let sql = "DELETE FROM frutas WHERE id_fruta = ?"
    conn.query(sql, [req.params.id_fruta], (err, result) => {
      if(err) throw res.status(404).json({error: err})
      if(result.affectedRows > 0){
        res.status(200).json({message: "Registro eliminado"})
      }else{
        res.status(404).json({message: "Registro no encontrado"})
      }
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

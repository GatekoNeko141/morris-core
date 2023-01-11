const conn = require("../db")
const tools = require("../tools")

exports.read = async (req, res) =>{
  const hasSesion = await tools.validateSesion(req, res)
  if(hasSesion){
    let sql = "SELECT * FROM frutas"
    conn.query(sql, (err, result) => {
      if(err) throw err
      res.status(200).json(result)
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.read_one = async (req, res) =>{
  const hasSesion = await tools.validateSesion(req, res)
  if(hasSesion){
    let sql = "SELECT * FROM frutas WHERE id = ?"
    conn.query(sql, [req.params.id], (err, result) => {
      if(err) throw err
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
  const hasSesion = await tools.validateSesion(req, res)
  if(hasSesion){
    let sql = "INSERT INTO frutas SET ?"
    conn.query(sql, [req.body], (err, result) => {
      if(err) throw err
      res.status(200).json({message: "Registro agregado"})
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.update = async (req, res) =>{
  const hasSesion = await tools.validateSesion(req, res)
  if(hasSesion){
    let sql = "UPDATE frutas SET ? WHERE id = ?"
    conn.query(sql, [req.body, req.params.id], (err, result) => {
      if(err) throw err
      res.status(200).json({message: "Registro actualizado"})
    })
  }else{
    res.status(403).json({message: "Acceso denegado"})
  }
}

exports.delete = async (req, res) =>{
  const hasSesion = await tools.validateSesion(req, res)
  if(hasSesion){
    let sql = "DELETE FROM frutas WHERE id = ?"
    conn.query(sql, [req.params.id], (err, result) => {
      if(err) throw err
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

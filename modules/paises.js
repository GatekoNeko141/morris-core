const db = require("../db")
const tools = require("../tools")

exports.read = async (req, res) =>{
  try{
    const conn = db.connect()

    const canExcecute = await tools.userValidator(req, res, "paises", "can_read")
    if(canExcecute){
      const sql = "SELECT * FROM paises"
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
  
    const canExcecute = await tools.userValidator(req, res, "paises", "can_read")
    if(canExcecute){
      let sql = "SELECT * FROM paises WHERE id_pais = ?"
      conn.query(sql, [req.params.id_pais], (err, result) => {
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
  
    const canExcecute = await tools.userValidator(req, res, "paises", "can_create")
    if(canExcecute){
      let sql = "INSERT INTO paises SET ?"
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
  
    const canExcecute = await tools.userValidator(req, res, "paises", "can_update")
    if(canExcecute){
      let sql = "UPDATE paises SET ? WHERE id_pais = ?"
      conn.query(sql, [req.body, req.params.id_pais], (err, result) => {
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
  
    const canExcecute = await tools.userValidator(req, res, "paises", "can_delete")
    if(canExcecute){
      let sql = "DELETE FROM paises WHERE id_pais = ?"
      conn.query(sql, [req.params.id_pais], (err, result) => {
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

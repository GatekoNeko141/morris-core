const express = require("express")
const router = express.Router()

const auth = require("./auth")
const endpoint = require("./endpoints")

// AUTENTICACION DE USUARIOS
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/is_auth', auth.isAuth)
router.get('/logout', auth.logout)

// ENDPOINTS O MICROSERVICIOS
router.get("/read", endpoint.read)
router.get("/read_one/:id", endpoint.read_one)
router.post('/create', endpoint.create)
router.put("/update/:id", endpoint.update)
router.delete("/delete/:id", endpoint.delete)

module.exports = router
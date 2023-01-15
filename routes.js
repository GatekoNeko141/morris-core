const express = require("express")
const router = express.Router()

const auth = require("./auth")
const frutas = require("./modules/frutas")

// AUTENTICACION DE USUARIOS
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/is_auth', auth.isAuth)
router.get('/logout', auth.logout)

// ENDPOINTS O MICROSERVICIOS
router.get('/read', frutas.read)
router.get('/read_one/:id_fruta', frutas.read_one)
router.post('/create', frutas.create)
router.put('/update/:id_fruta', frutas.update)
router.delete('/delete/:id_fruta', frutas.delete)

module.exports = router
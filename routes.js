const express = require("express")
const router = express.Router()

const auth = require("./auth")
const frutas = require("./modules/frutas")
const paises = require("./modules/paises")

// AUTENTICACION DE USUARIOS
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/is_auth', auth.isAuth)
router.get('/logout', auth.logout)

// ENDPOINTS O MICROSERVICIOS
router.get('/frutas/read', frutas.read)
router.get('/frutas/read_one/:id_fruta', frutas.read_one)
router.post('/frutas/create', frutas.create)
router.put('/frutas/update/:id_fruta', frutas.update)
router.delete('/frutas/delete/:id_fruta', frutas.delete)

router.get('/paises/read', paises.read)
router.get('/paises/read_one/:id_pais', paises.read_one)
router.post('/paises/create', paises.create)
router.put('/paises/update/:id_pais', paises.update)
router.delete('/paises/delete/:id_pais', paises.delete)

module.exports = router
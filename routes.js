const express = require("express")
const router = express.Router()

const auth = require("./auth")
const frutas = require("./modules/frutas")
const paises = require("./modules/paises")
const users =  require("./modules/users")

// AUTENTICACION DE USUARIOS
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/is_auth', auth.isAuth)
router.get('/logout', auth.logout)

// ENDPOINTS O MICROSERVICIOS
router.get('/frutas', frutas.read)
router.get('/frutas/:id_fruta', frutas.read_one)
router.post('/frutas', frutas.create)
router.put('/frutas/:id_fruta', frutas.update)
router.delete('/frutas/:id_fruta', frutas.delete)

router.get('/paises', paises.read)
router.get('/paises/:id_pais', paises.read_one)
router.post('/paises', paises.create)
router.put('/paises/:id_pais', paises.update)
router.delete('/paises/:id_pais', paises.delete)

router.get('/users', users.read)
router.get('/users/:id_user', users.read_one)
router.post('/users', users.create)
router.put('/users/:id_user', users.update)
router.delete('/users/:id_user', users.delete)

module.exports = router
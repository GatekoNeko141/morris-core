const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const os = require('os')
const interfaces = os.networkInterfaces()

dotenv.config({path: '.env'})

let addresses = []
for(let i in interfaces) {
  for(let j in interfaces[i]) {
    let address = interfaces[i][j];
    if(address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address)
    }
  }
}

const app = express()

const host = process.env.SV_HOST || addresses[0]
const port = process.env.SV_PORT || 3000

app.set("port", port)

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(require("./routes"))

app.use((req, res, next) => {
  if(!req.user){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
  }
})

app.listen(app.get('port'), () => {
  console.log(`Node API ejecutado en http://${host}:${app.get('port')}`)
})
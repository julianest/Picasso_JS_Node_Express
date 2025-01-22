import express from 'express'
import path from 'path'
import { PORT } from './config/config.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import loginRoutes from './src/routes/LoginRoutes.js'
import dotenv from 'dotenv'

// Configurar variables de entorno
dotenv.config()
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use('/utils', express.static('utils'))

// Middleware
app.use(express.static(path.resolve('./public'))) // Scaneo archivo estaticos
app.use(express.json()) // Aqui nos permite una vez enviada la peticion generar la conversion a json que ya viene de express.
app.use(cookieParser()) // Enviamos la informacion por cookies

app.use((req, res, next) => {
  const token = req.cookies.access_token

  if (!token) { // Si no ahi token no realizar nada y continuar
    req.session = { user: null }
    return next()
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session = { user: data }
  } catch (err) {
    console.error(err)
    req.session.user = null
  }

  next() // envia a la siguiente ruta o middleware
})
// Routes
app.use('/', loginRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

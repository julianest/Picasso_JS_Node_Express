import express from 'express'
import path from 'path'
import { PORT } from './config/config.js'
// import { UserRepository } from './src/models/user-repository.js'
import loginRoutes from './src/routes/LoginRoutes.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')

// Middleware
app.use(express.static(path.resolve('./public'))) // Scaneo archivo estaticos
app.use(express.json()) // Aqui nos permite una vez enviada la peticion generar la conversion a json que ya viene de express.
// Routes
app.use('/', loginRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import express from 'express'
import { renderLogin, handleLogin, handleRegister } from '../controllers/UserController.js'

const router = express.Router()

// Ruta para el login
router.get('/', renderLogin) // Renderiza la vista del login
router.post('/login', handleLogin) // Maneja el login
router.post('/register', handleRegister) // Maneja el registro

export default router

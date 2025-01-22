import express from 'express'
import { renderLogin, handleLogin, handleRegister, handleProtected, handleLogout } from '../controllers/UserController.js'
// import authenticateToken from '../../config/tokenConfig.js'

const router = express.Router()

// Ruta para el login
router.get('/', renderLogin) // Renderiza la vista del login
router.post('/login', handleLogin) // Maneja el login
router.post('/logout', handleLogout) // Maneja el cerrado de la sesion
router.post('/register', handleRegister) // Maneja el registro
router.get('/protected', handleProtected) // Maneja la pagina accesada con la autenticacion

export default router

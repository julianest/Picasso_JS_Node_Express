import jwt from 'jsonwebtoken'
import { UserRepository } from '../models/UserRepository.js'

export const renderLogin = (req, res) => {
  const { user } = req.session
  res.render('login', user)
}

export const renderRegisterForm = (req, res) => {
  res.render('Register')
}

export const handleLogin = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_JWT_KEY,
      { expiresIn: '1d' }
    )
    res.cookie('access_token', token, {
      httpOnly: true, // httpOnly: la cookie solo se puede acceder en el servidor
      secure: process.env.NODE_ENV === 'production', // solo en producción
      sameSite: 'strict', // la cookie solo se puede acceder en el mismo sitio o dominio
      maxAge: 60 * 60 * 1000 // 1h en milisegundos
    })
    res.status(200).json({ redirectTo: '/protected', message: 'Login successful' })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

export const handleRegister = async (req, res) => {
  const { username, email, password } = req.body
  console.log('Datos recibidos:', { username, password, email })
  try {
    const userId = await UserRepository.create({ username, password, email })
    res.status(201).json({ message: 'User registered successfully: ', userId })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const handleProtected = async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).json({ message: 'Unauthorized' })
  res.render('Protected', { username: user.username })
}

export const handleLogout = async (req, res) => {
  res.clearCookie('access_token')
  res.redirect('/')
  // res.status(200).json({ message: 'Sesión cerrada' })
}

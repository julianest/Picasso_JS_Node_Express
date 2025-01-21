import express from 'express'
import { UserRepository } from '../models/UserRepository.js'

const app = express()

export const renderLogin = (req, res) => {
  res.render('login/Login', { title: 'Login Page' })
}

app.post('/login', async (request, response) => {
  const { username, password } = request.body
  try {
    const user = await UserRepository.login({ username, password })
    response.status(200).json({ message: 'Login successful', user })
  } catch (err) {
    response.status(401).send(err.message)
  }
})

export const handleLogin = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    res.status(200).json({ message: 'Login successful', user })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

export const handleRegister = async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.status(201).json({ message: 'User registered successfully', id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

app.post('/register', async (request, response) => {
  const { username, password } = request.body
  console.log(request.body + ' - ' + username + ' - ' + password)

  try {
    const id = await UserRepository.create({ username, password })
    response.send({ id })
  } catch (err) {
    response.status(400).send(err.message)
  }
})
app.post('/logout', (request, response) => {})
app.get('/protected', (request, response) => {
  response.render('protected')// ,{username:} )
})

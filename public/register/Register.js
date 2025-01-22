import { delay, showOnSpinner, showOffSpinner, setupPasswordToggle, showErrorOrResponse } from '../../utils/Tools.js'

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  // Form
  const registerForm = document.getElementById('register-form')
  // Spiner de carga
  const loadingIndicator = document.getElementById('loading-indicator')
  // Botones
  const cancelButton = document.getElementById('cancel-button')
  // Boton Input cambiar la visibilidad
  const passwordInput = document.getElementById('password')
  const togglePassword = document.getElementById('toggle-password')
  // Inputs
  const usernameInput = document.getElementById('username')
  const emailInput = document.getElementById('email')
  // Mensajes de respuesta
  const responseOverlay = document.getElementById('response-overlay')
  const responseContainMessage = document.getElementById('response-contain-message')

  setupPasswordToggle(togglePassword, passwordInput)

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!username || !email || !password) {
      alert('Por favor, complete todos los campos.')
      return
    }

    showOnSpinner(loadingIndicator)

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email }),
        credentials: 'include'
      })

      const responseMessage = await response.json()

      if (response.ok) {
        await delay(3000)
        showErrorOrResponse(201, 'Registro exitoso. Redirigiendo...', responseContainMessage, responseOverlay)
        await delay(3000)
        location.assign('/') // Redirige al login tras registro exitoso
      } else {
        if (response.status === 400 && responseMessage.error === 'Usuario ya Existe') {
          showErrorOrResponse(400, `Error: ${responseMessage.error} Por favor, intente otro nombre de usuario.`, responseContainMessage, responseOverlay)
        } else {
          alert(responseMessage.error)
        }
      }
    } catch (error) {
      alert('Error al registrar el usuario. Por favor, intente nuevamente.' + error)
    } finally {
      showOffSpinner(loadingIndicator)
    }
  })

  cancelButton.addEventListener('click', function () {
    usernameInput.value = ''
    passwordInput.value = ''
    emailInput.value = ''
  })
})

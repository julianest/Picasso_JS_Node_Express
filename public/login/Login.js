import { delay, showOnSpinner, showOffSpinner, showErrorOrResponse, setupPasswordToggle } from '../../utils/Tools.js'

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  // Boton Input cambiar la visibilidad
  const passwordInput = document.getElementById('password')
  const togglePassword = document.getElementById('toggle-password')
  // Botones
  const cancelButton = document.getElementById('cancel-button')
  // Formulario
  const loginForm = document.getElementById('login-form')
  // Estados
  const usernameInput = document.getElementById('username')
  // Spiner de carga
  const loadingIndicator = document.getElementById('loading-indicator')
  // Mensajes de respuesta
  const responseOverlay = document.getElementById('response-overlay')
  const responseContainMessage = document.getElementById('response-contain-message')

  setupPasswordToggle(togglePassword, passwordInput)

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (!username || !password) {
      alert('Por favor, complete todos los campos.')
      return
    }

    showOnSpinner(loadingIndicator)

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      if (response.ok) {
        const { redirectTo } = await response.json() // obtenemos la URL desde la respuesta
        await delay(3000)
        location.assign(redirectTo) // la asignamos location.assign para navegar
      } else if (response.status === 401) {
        showErrorOrResponse(401, 'Usuario o Contraseña invalidos. Por favor, intente nuevamente.', responseContainMessage, responseOverlay)
      } else {
        const responseMessage = await response.json()
        showErrorOrResponse('generic', `Error: ${responseMessage} Por favor, intente nuevamente.`, responseContainMessage, responseOverlay)
      }
    } catch (error) {
      alert(`Error: ${error} al iniciar sesión. Por favor, intente nuevamente.`)
    } finally {
      showOffSpinner(loadingIndicator)
    }
  })

  cancelButton.addEventListener('click', function () {
    usernameInput.value = ''
    passwordInput.value = ''
  })
})

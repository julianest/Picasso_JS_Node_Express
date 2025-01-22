import { delay } from '../../utils/Tools.js'

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  // Boton Input cambiar la visibilidad
  const passwordInput = document.getElementById('password')
  const togglePassword = document.getElementById('toggle-password')
  // Botones
  const loginButton = document.getElementById('login-button')
  const logoutButton = document.getElementById('logout-button')
  const cancelButton = document.getElementById('cancel-button')
  // Formulario
  const loginForm = document.getElementById('login-form')
  // Estados
  const usernameInput = document.getElementById('username')
  // const loggedInStatus = document.getElementById('logged-in-status')
  // Spiner de carga
  const loadingIndicator = document.getElementById('loading-indicator')

  togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password'
    passwordInput.type = type
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈'
  })

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (!username || !password) {
      alert('Por favor, complete todos los campos.')
      return
    }

    showOnSpinner()

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
        await delay(2000)

        location.assign(redirectTo) // la asignamos location.assign para navegar
      } else if (response.status === 401) {
        alert('El usuario o la contraseña son incorrectos. Por favor, intente nuevamente.')
      } else {
        const errorMessage = await response.json()
        alert(`Error: ${errorMessage} Por favor, intente nuevamente.`)
      }
    } catch (error) {
      alert(`Error: ${error} al iniciar sesión. Por favor, intente nuevamente.`)
    } finally {
      showOffSpinner()
    }

    /* await withMinimumDelay(async () => {
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
          const data = await response.json()
          location.assign(data.redirectTo) // Redirige al URL proporcionado por el backend
        } else if (response.status === 401) {
          alert('El usuario o la contraseña son incorrectos. Por favor, intente nuevamente.')
        } else {
          const errorMessage = await response.json()
          alert(`Error: ${errorMessage.error}`)
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        alert('Error del catch al iniciar sesión. Por favor, intente nuevamente.')
      }
    }, 5000) // Tiempo mínimo de espera: 1 segundo
    showOffSpinner() */
  })

  logoutButton.addEventListener('click', function () {
    // sessionStorage.removeItem('loggedInUser')
    // showLoggedOutState()
  })

  cancelButton.addEventListener('click', function () {
    usernameInput.value = ''
    passwordInput.value = ''
  })

  function showOnSpinner () {
    loadingIndicator.style.display = 'block'
    loginButton.textContent = 'Iniciando sesión...'
    loginButton.disabled = true
  }

  function showOffSpinner () {
    loadingIndicator.style.display = 'none'
    loginButton.textContent = 'Iniciar Sesión'
    loginButton.disabled = false
  }
})

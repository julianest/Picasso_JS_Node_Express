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
  const loggedInStatus = document.getElementById('logged-in-status')

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

    try {
      // Enviar datos al servidor (login)
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        alert(`Error: ${errorMessage}`)
        return
      }

      const data = await response.json()
      sessionStorage.setItem('loggedInUser', data.user.username)
      showLoggedInState()
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      alert('Error al iniciar sesión. Por favor, intente nuevamente.')
    }
  })

  if (sessionStorage.getItem('loggedInUser')) {
    showLoggedInState()
  }

  logoutButton.addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser')
    showLoggedOutState()
  })

  cancelButton.addEventListener('click', function () {
    usernameInput.value = ''
    passwordInput.value = ''
  })

  function showLoggedInState () {
    loginButton.style.display = 'none'
    logoutButton.style.display = 'inline-block'
    cancelButton.style.display = 'none'
    logoutButton.classList.add('logout')
    loggedInStatus.style.display = 'block'
    loggedInStatus.textContent = `Usuario logueado: ${sessionStorage.getItem('loggedInUser')}`
  }

  function showLoggedOutState () {
    loginButton.style.display = 'inline-block'
    logoutButton.style.display = 'none'
    cancelButton.style.display = 'inline-block'
    loggedInStatus.style.display = 'none'
    usernameInput.value = ''
    passwordInput.value = ''
  }
})

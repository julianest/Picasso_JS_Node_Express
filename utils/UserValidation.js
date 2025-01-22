export class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('Usernamedebe tener al menos 3 caracteres de longitud')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 4) throw new Error('Password debe tener al menos 4 caracteres de longitud')
  }

  static email (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      throw new Error('El correo electrónico no es válido.')
    }
  }
}

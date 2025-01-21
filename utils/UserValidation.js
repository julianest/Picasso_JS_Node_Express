export class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 4) throw new Error('Password must be at least 4 characters long')
  }
}

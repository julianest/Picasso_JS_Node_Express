import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../config/config.js'
import { Validation } from '../../utils/UserValidation.js'

import crypto from 'node:crypto'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // email: { type: String, required: true },
  // created_at: { type: Date, default: Date.now },
  // updated_at: { type: Date, default: Date.now }
})

export class UserRepository {
  static async create ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    const id = crypto.randomUUID().toString()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()
    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = await User.findOne({ username })
    if (!user) throw new Error('Invalid username or password')

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Invalid username or password')

    const { password: _, ...publicUser } = user // De esta forma eliminamos el password que se devuelve en la peticion.

    return publicUser
  }
}

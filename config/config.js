export const {
  PORT = 3000,
  SALT_ROUNDS = 10 // Produccion = 10, Dev = 4 numero de veces que se va a hashear
} = process.env

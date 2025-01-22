# Picasso Project JS Node Express

## Descripción
Picasso Project JS Node Express es una aplicación para la gestión de usuarios creada con Node.js, Express, EJS y JavaScript. Este proyecto permite autenticar y manejar usuarios utilizando herramientas modernas y una arquitectura modular.

---

## Características principales
- **Autenticación segura:** Uso de `bcrypt` para el hashing de contraseñas y `jsonwebtoken` para la gestión de tokens JWT.
- **Renderizado de vistas dinámicas:** Utilización de `EJS` como motor de plantillas.
- **Gestión de cookies:** Incorporación de `cookie-parser` para manejar cookies de forma eficiente.
- **Configuración sencilla:** Gestión de variables de entorno con `dotenv`.
- **Base de datos local:** Uso de `db-local` para almacenamiento rápido y ligero.

---

## Estructura del proyecto
```
📦 picassoproyect_js_node_express
├── 📂 config
│   └── config.js         # Variables de configuración
├── 📂 db
│   └── User.json         # Datos de la base de datos local
├── 📂 node_modules       # Archivos del empaquetado
├── 📂 public
│   ├── styles.css        # Estilos generales
│   ├── 📂 login
│   │   ├── Login.js      # Lógica para la vista de login
│   │   └── Login.css     # Estilos específicos para login
│   ├── 📂 protected
│   ├── 📂 register
│   ├── 📂 resources      # Imágenes y otros recursos
├── 📂 src
│   ├── 📂 controllers
│   │   └── UserController.js   # Controlador principal de usuarios
│   ├── 📂 models
│   │   └── userRepository.js   # Repositorio para la gestión de datos de usuarios
│   ├── 📂 routes
│   │   └── LoginRoutes.js      # Rutas relacionadas con el login
│   ├── 📂 views
│   │   ├── Login.ejs           # Vista para login
│   │   ├── Protected.ejs       # Vista para contenido protegido
│   │   └── Register.ejs        # Vista para registro de usuarios
│   ├── 📂 utils
│       ├── Tools.js            # Utilidades como spinner y otros
│       └── UserValidation.js   # Validaciones de usuarios
├── .env                   # Variables de entorno
├── .gitignore             # Archivos ignorados por git
├── app.js                 # Configuración principal del servidor
├── package-lock.json      # Detalles de las dependencias instaladas
├── package.json           # Configuración del proyecto
└── README.md              # Documentación del proyecto
```

---

## Diagrama del proyecto
![diagrama de flujo.png](/public/resources/diagrama%20de%20flujo.png)
---

# Documentación de Endpoints de la API

## Endpoints

### 1. `/`
**Descripción:** Renderiza la vista del login.
- **Método:** `GET`
- **Parámetros:** Ninguno.
- **Respuesta:** Renderiza la vista `login.ejs` con los datos del usuario en sesión.

---

### 2. `/login`
**Descripción:** Maneja el inicio de sesión.
- **Método:** `POST`
- **Parámetros:**
  - `username` (string, requerido): Nombre de usuario.
  - `password` (string, requerido): Contraseña del usuario.
- **Respuesta:**
  - `200 OK`: Devuelve un JSON con un mensaje de éxito y la redirección al endpoint `/protected`.
  - `401 Unauthorized`: Devuelve un JSON con un mensaje de error.

---

### 3. `/logout`
**Descripción:** Maneja el cierre de sesión.
- **Método:** `POST`
- **Parámetros:** Ninguno.
- **Respuesta:**
  - Borra la cookie `access_token` y redirige a `/`.

---

### 4. `/register`
**Descripción:** Maneja el registro de nuevos usuarios.
- **Métodos:**
  - `GET`: Renderiza la vista del formulario de registro.
  - `POST`: Procesa el registro del usuario.
- **Parámetros para `POST`:**
  - `username` (string, requerido): Nombre de usuario.
  - `email` (string, requerido): Correo electrónico del usuario.
  - `password` (string, requerido): Contraseña del usuario.
- **Respuesta:**
  - `201 Created`: Devuelve un JSON con un mensaje de éxito y el ID del usuario registrado.
  - `400 Bad Request`: Devuelve un JSON con un mensaje de error.

---

### 5. `/protected`
**Descripción:** Renderiza una vista protegida, accesible solo para usuarios autenticados.
- **Método:** `GET`
- **Parámetros:** Ninguno.
- **Respuesta:**
  - `200 OK`: Renderiza la vista `Protected.ejs` con el nombre de usuario.
  - `403 Forbidden`: Devuelve un JSON indicando que el usuario no está autorizado.

---

## Controlador
### UserController.js
- **renderLogin:** Renderiza la vista del login.
- **renderRegisterForm:** Renderiza el formulario de registro.
- **handleLogin:** Procesa el inicio de sesión verificando credenciales y generando un token JWT.
- **handleRegister:** Procesa el registro de usuarios, validando datos y almacenándolos en la base de datos local.
- **handleProtected:** Renderiza contenido protegido si el usuario está autenticado.
- **handleLogout:** Borra la cookie de autenticación y redirige al usuario al inicio.

---

## Repositorio de Usuarios
### UserRepository.js
- **create:**
  - Valida los datos del usuario.
  - Cifra la contraseña y crea un registro en la base de datos local.
  - Retorna el ID del usuario creado.
- **login:**
  - Valida las credenciales del usuario.
  - Verifica la contraseña usando bcrypt.
  - Devuelve los datos públicos del usuario si las credenciales son válidas.

---

## Notas
- Las cookies son configuradas con las siguientes propiedades:
  - `httpOnly`
  - `secure` (solo en producción)
  - `sameSite: 'strict'`
  - Expiración de 1 hora.
- Las validaciones se realizan mediante el módulo `UserValidation.js`.

---

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd picassoproyect_js_node_express
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias, por ejemplo:
   ```env
   PORT=3000
   SECRET_KEY=tu_secreto_para_jwt
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Dependencias principales
- `bcrypt`: Hashing seguro de contraseñas.
- `cookie-parser`: Análisis y manejo de cookies.
- `db-local`: Base de datos ligera y local.
- `dotenv`: Gestión de variables de entorno.
- `ejs`: Motor de plantillas para renderizado dinámico.
- `express`: Framework backend minimalista y flexible.
- `jsonwebtoken`: Creación y verificación de tokens JWT.

---

## Dependencias de desarrollo
- `standard`: Linter de código JavaScript basado en las mejores prácticas.

---

## Scripts disponibles
- `npm run dev`: Inicia la aplicación en modo desarrollo con soporte para reinicios automáticos al detectar cambios.
- `npm test`: Ejecuta los tests configurados (actualmente no implementados).

---

## Licencia
Este proyecto está licenciado bajo la licencia ISC.

---

## Autor
**Julian Steven Huerfano.**

---

## Contribuciones
Si deseas contribuir, por favor crea un fork del repositorio y envía un pull request con tus cambios.

---

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más detalles.

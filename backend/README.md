# Pixel & Frames - Backend API

Backend Node.js + Express + PostgreSQL para la aplicación Pixel & Frames.

## 🚀 Tecnologías

- **Node.js** v18+
- **Express** - Framework web
- **PostgreSQL** - Base de datos
- **Railway** - Hosting y deployment

## 📦 Instalación Local

```bash
cd backend
npm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env`:
```bash
copy .env.example .env
```

2. Edita `.env` con tus credenciales de PostgreSQL

## 🗄️ Inicializar Base de Datos

```bash
npm run init-db
```

Esto creará las tablas e insertará datos iniciales.

## 🏃 Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor estará en `http://localhost:3000`

## 📡 API Endpoints

### Recommendations
- `GET /api/recommendations` - Obtener todas las recomendaciones
- `GET /api/recommendations/:id` - Obtener una recomendación
- `POST /api/recommendations` - Crear recomendación
- `DELETE /api/recommendations/:id` - Eliminar recomendación

### Games
- `GET /api/games` - Todos los juegos
- `GET /api/games/:id` - Un juego
- `POST /api/games` - Crear juego
- `PUT /api/games/:id` - Actualizar juego
- `DELETE /api/games/:id` - Eliminar juego

### Movies
- `GET /api/movies` - Todas las películas
- `GET /api/movies/:id` - Una película
- `POST /api/movies` - Crear película
- `PUT /api/movies/:id` - Actualizar película
- `DELETE /api/movies/:id` - Eliminar película

## 🚂 Deploy en Railway

1. Crear nuevo proyecto en Railway
2. Agregar servicio PostgreSQL
3. Conectar este repositorio
4. Railway detectará automáticamente el `railway.json`
5. Configurar variables de entorno:
   - `DATABASE_URL` (automático con PostgreSQL addon)
   - `FRONTEND_URL` - URL de tu frontend
6. Deploy automático

## 🔗 Conectar Frontend

El frontend debe hacer fetch a:
```javascript
const API_URL = 'https://tu-app.railway.app/api';
```

## 📝 Estructura

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Configuración PostgreSQL
│   │   └── initDatabase.js   # Script inicialización
│   ├── routes/
│   │   ├── recommendations.js
│   │   ├── games.js
│   │   └── movies.js
│   └── server.js             # Servidor Express
├── package.json
├── .env.example
└── railway.json
```

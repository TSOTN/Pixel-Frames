# 🔗 Conectando Frontend y Backend

Esta guía te ayudará a conectar tu frontend con el backend en Railway.

## 📋 Pasos para el deployment completo

### 1. Desplegar Backend en Railway

1. **Crear cuenta en Railway**
   - Ve a [railway.app](https://railway.app)
   - Inicia sesión con GitHub

2. **Crear nuevo proyecto**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Autoriza Railway a acceder a tus repos
   - Selecciona este repositorio

3. **Configurar PostgreSQL**
   - En tu proyecto, click "+ New"
   - Selecciona "Database" → "Add PostgreSQL"
   - Railway automáticamente creará la variable `DATABASE_URL`

4. **Configurar variables de entorno**
   - Ve a tu servicio backend
   - Click en "Variables"
   - Añade:
     - `NODE_ENV=production`
     - `FRONTEND_URL=*` (o tu URL específica del frontend)

5. **Inicializar la base de datos**
   - Una vez desplegado, ve a tu servicio
   - Click en "Settings" → "Deploy"
   - Ejecuta el comando: `npm run init-db`
   
   O conéctate a la base de datos y ejecuta el SQL manualmente

6. **Obtén tu URL del backend**
   - En el servicio backend, click en "Settings"
   - Copia la URL (algo como: `https://tu-app.up.railway.app`)

### 2. Actualizar Frontend

1. **Abrir `api.js`**
   - Localiza la línea 5:
   ```javascript
   : 'https://your-railway-app.railway.app/api'
   ```

2. **Reemplazar con tu URL de Railway**
   ```javascript
   : 'https://tu-app-real.up.railway.app/api'
   ```

3. **Guardar y probar**
   - Abre `index.html` en tu navegador
   - Abre la consola del navegador (F12)
   - Debería cargar las recomendaciones desde la API

### 3. Desplegar Frontend (Opcional)

Puedes desplegar el frontend en:

#### **Netlify** (Recomendado para sitios estáticos)
1. Sube tu carpeta frontend a un repo de GitHub
2. Conecta el repo a Netlify
3. Deploy automático

#### **Vercel**
1. Similar a Netlify
2. Conecta repo y despliega

#### **GitHub Pages**
1. Sube archivos a un repo
2. Habilita GitHub Pages en Settings

## 🧪 Probar Localmente

### Backend:
```bash
cd backend
npm install
# Copia .env.example a .env y configura DATABASE_URL
npm run init-db
npm run dev
```

Servidor corriendo en: `http://localhost:3000`

### Frontend:
Simplemente abre `index.html` en tu navegador o usa Live Server en VS Code.

## 🐛 Troubleshooting

### Error: "No se pudo conectar con el servidor"
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la URL en `api.js`
- ✅ Abre la consola del navegador para ver errores
- ✅ Verifica que CORS esté habilitado en el backend

### Error: "Failed to fetch"
- ✅ Backend no está accesible
- ✅ Revisa los logs en Railway
- ✅ Verifica que PostgreSQL esté conectado

### No hay datos
- ✅ Ejecuta `npm run init-db` para crear las tablas
- ✅ Verifica la conexión a PostgreSQL

## 📊 Endpoints Disponibles

- `GET /api/recommendations` - Obtener todas las recomendaciones
- `GET /api/games` - Obtener todos los juegos
- `GET /api/movies` - Obtener todas las películas

Consulta el [README del backend](backend/README.md) para la lista completa.

## ✅ Verificación

Si todo funciona correctamente:
1. ✅ La página muestra un "⏳ Cargando recomendaciones..."
2. ✅ Luego se cargan las tarjetas de juegos/películas
3. ✅ No hay errores en la consola del navegador
4. ✅ Puedes voltear las tarjetas normalmente

¡Felicidades! Tu frontend está conectado al backend. 🎉

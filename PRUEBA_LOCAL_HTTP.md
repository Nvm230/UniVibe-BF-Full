# 🧪 Prueba Local con HTTP

## 🚀 Pasos para Levantar

### 1. Detener contenedores anteriores (si hay)

```bash
docker compose down
docker compose -f docker-compose.local-http.yml down
```

### 2. Construir y levantar con docker-compose.local-http.yml

```bash
docker compose -f docker-compose.local-http.yml up -d --build
```

### 3. Ver logs en tiempo real

```bash
docker compose -f docker-compose.local-http.yml logs -f
```

O ver logs de un servicio específico:
```bash
docker compose -f docker-compose.local-http.yml logs -f backend
docker compose -f docker-compose.local-http.yml logs -f frontend
```

### 4. Verificar que los servicios estén corriendo

```bash
docker compose -f docker-compose.local-http.yml ps
```

Deberías ver:
- `univibe-db` - Corriendo
- `univibe-backend` - Corriendo
- `univibe-frontend` - Corriendo

## 🌐 Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

## ✅ Pruebas a Realizar

### 1. Verificar que el Frontend Carga

1. Abre tu navegador en: `http://localhost:5173`
2. Deberías ver la página de login o la aplicación
3. Abre la consola del navegador (F12) y verifica que no hay errores

### 2. Verificar Google OAuth Client ID

En la consola del navegador (F12), escribe:
```javascript
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
```

Debería mostrar: `YOUR_CLIENT_ID.apps.googleusercontent.com`

### 3. Probar Login con Google

1. Ve a la página de login: `http://localhost:5173/login`
2. Deberías ver un botón "Iniciar sesión con Google"
3. Haz clic en el botón
4. Selecciona una cuenta de Google
5. Deberías ser redirigido y autenticado

**⚠️ Importante**: Asegúrate de tener `http://localhost:5173` configurado en Google Cloud Console:
- Orígenes JavaScript autorizados
- URIs de redirección autorizados

### 4. Probar Búsqueda de Spotify

1. Inicia sesión (con Google o email/password)
2. Ve a "Historias" o "Publicaciones"
3. Haz clic en "Crear Historia" o "Nueva Publicación"
4. En el campo "Música de fondo", selecciona "Spotify"
5. Busca una canción (ej: "Imagine Dragons", "Bad Bunny", "The Weeknd")
6. Deberías ver resultados de Spotify con:
   - Nombre de la canción
   - Artista
   - Portada del álbum
   - Botón para seleccionar

**⚠️ Importante**: Asegúrate de tener `http://localhost:5173` y `http://localhost:8080` configurados en Spotify Dashboard:
- Redirect URIs
- Allowed Origins (CORS)

### 5. Verificar Backend API

```bash
# Health check
curl http://localhost:8080/actuator/health

# Probar Spotify API (requiere autenticación)
curl http://localhost:8080/api/spotify/search?q=Imagine%20Dragons&limit=5
```

## 🔍 Verificar Variables de Entorno

### Backend

```bash
# Ver variables del backend
docker compose -f docker-compose.local-http.yml exec backend env | grep -i "SPOTIFY\|GOOGLE"
```

Deberías ver:
- `SPOTIFY_CLIENT_ID=00add696219c4f0a96f9ddcabebcb2a3`
- `SPOTIFY_CLIENT_SECRET=REDACTED_SPOTIFY_SECRET`
- `GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET`

### Frontend

En la consola del navegador (F12):
```javascript
// Verificar Google Client ID
console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID)
```

## 🐛 Troubleshooting

### Si el frontend no carga:

```bash
# Ver logs del frontend
docker compose -f docker-compose.local-http.yml logs frontend

# Reconstruir solo el frontend
docker compose -f docker-compose.local-http.yml build --no-cache frontend
docker compose -f docker-compose.local-http.yml up -d frontend
```

### Si el backend no responde:

```bash
# Ver logs del backend
docker compose -f docker-compose.local-http.yml logs backend

# Verificar que la base de datos esté corriendo
docker compose -f docker-compose.local-http.yml ps db
```

### Si Google OAuth no funciona:

1. Verifica en la consola del navegador si hay errores
2. Verifica que `VITE_GOOGLE_CLIENT_ID` esté cargado (ver paso 2)
3. Verifica en Google Cloud Console que `http://localhost:5173` esté configurado
4. Reconstruye el frontend:
   ```bash
   docker compose -f docker-compose.local-http.yml build --no-cache frontend
   docker compose -f docker-compose.local-http.yml up -d frontend
   ```

### Si Spotify no funciona:

1. Verifica en la consola del navegador si hay errores
2. Verifica que las variables de entorno estén cargadas en el backend (ver paso 5)
3. Verifica en Spotify Dashboard que `http://localhost:5173` y `http://localhost:8080` estén configurados
4. Reconstruye el backend:
   ```bash
   docker compose -f docker-compose.local-http.yml build --no-cache backend
   docker compose -f docker-compose.local-http.yml up -d backend
   ```

## 🛑 Detener los Servicios

```bash
docker compose -f docker-compose.local-http.yml down
```

O si quieres eliminar también los volúmenes:

```bash
docker compose -f docker-compose.local-http.yml down -v
```

## ✅ Checklist de Pruebas

- [ ] Contenedores levantados sin errores
- [ ] Frontend accesible en `http://localhost:5173`
- [ ] Backend accesible en `http://localhost:8080`
- [ ] `VITE_GOOGLE_CLIENT_ID` cargado en el frontend
- [ ] Variables de entorno cargadas en el backend
- [ ] Botón "Iniciar sesión con Google" visible
- [ ] Login con Google funciona
- [ ] Búsqueda de Spotify funciona
- [ ] No hay errores en la consola del navegador




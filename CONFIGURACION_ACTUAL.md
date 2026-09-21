# 📝 Configuración Actual de Variables de Entorno

## ✅ Estado Verificado

### Backend (`backend/.env`)
- ✅ `SPRING_DATASOURCE_URL` - Configurado
- ✅ `SPRING_DATASOURCE_USERNAME` - Configurado
- ✅ `SPRING_DATASOURCE_PASSWORD` - Configurado
- ✅ `SECURITY_JWT_SECRET` - Configurado
- ✅ `SECURITY_JWT_TTL_SECONDS` - Configurado
- ✅ `SPOTIFY_CLIENT_ID` - Configurado: `00add696219c4f0a96f9ddcabebcb2a3`
- ✅ `SPOTIFY_CLIENT_SECRET` - Configurado: `REDACTED_SPOTIFY_SECRET`

### Frontend (`frontend/web/.env`)
- ✅ `VITE_API_BASE_URL` - Configurado

## ⚠️ Variables Pendientes (Opcionales)

### Para Login con Google

**Backend (`backend/.env`):**
```bash
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

**Frontend (`frontend/web/.env`):**
```bash
VITE_GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
```

**Nota:** El `GOOGLE_CLIENT_ID` debe ser el mismo en ambos archivos.

## 🎵 Spotify - Listo para Usar

Con las credenciales que tienes configuradas:
- ✅ La búsqueda de música en Spotify debería funcionar
- ✅ Los usuarios podrán buscar canciones al crear historias o publicaciones
- ✅ Se mostrarán portadas de álbumes y nombres de artistas

**Para probar:**
1. Inicia el backend
2. Crea una historia o publicación
3. Selecciona "Spotify" en el selector de música
4. Busca una canción (ej: "Shape of You")
5. Deberías ver resultados con portadas

## 🔐 Google OAuth - Pendiente de Configurar

Si quieres habilitar el login con Google, necesitas:

1. **Obtener credenciales de Google:**
   - Ve a https://console.cloud.google.com/
   - Crea un proyecto o selecciona uno existente
   - Habilita "Google Identity Services"
   - Crea un "ID de cliente OAuth 2.0"
   - Tipo: Aplicación web
   - Orígenes autorizados: `http://localhost:5173` (y tu dominio de producción)
   - URI de redirección: `http://localhost:5173` (y tu dominio de producción)

2. **Agregar al backend (`backend/.env`):**
   ```bash
   GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=tu_client_secret
   ```

3. **Agregar al frontend (`frontend/web/.env`):**
   ```bash
   VITE_GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
   ```

4. **Reiniciar servicios:**
   - Backend: Reinicia el servidor Spring Boot
   - Frontend: Reinicia el servidor de desarrollo (`npm run dev`)

## 📋 Resumen

### ✅ Funcionalidades Activas
- Base de datos PostgreSQL
- Autenticación JWT
- **Búsqueda de música en Spotify** 🎵

### ⚠️ Funcionalidades Pendientes (Opcionales)
- Login con Google OAuth

## 🚀 Próximos Pasos

1. **Probar Spotify:**
   - Inicia el backend y frontend
   - Crea una historia o publicación
   - Prueba la búsqueda de música

2. **Configurar Google (si lo deseas):**
   - Sigue los pasos arriba
   - El botón de Google aparecerá en la página de login

3. **Verificar que todo funciona:**
   - Revisa los logs del backend para errores
   - Prueba crear historias/publicaciones con música
   - Verifica que la música se reproduce correctamente




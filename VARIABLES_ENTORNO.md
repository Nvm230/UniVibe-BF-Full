# Variables de Entorno Requeridas

Este documento lista todas las variables de entorno necesarias para que la aplicación funcione correctamente.

## 🔧 Backend (Spring Boot)

### Base de Datos (Obligatorio)
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/univibe
SPRING_DATASOURCE_USERNAME=univibe
SPRING_DATASOURCE_PASSWORD=univibe
```

### Seguridad JWT (Obligatorio)
```bash
# Clave secreta para firmar tokens JWT (debe ser una cadena base64 de al menos 64 caracteres)
SECURITY_JWT_SECRET=REDACTED_JWT_SECRET
# Tiempo de vida del token en segundos (86400 = 24 horas)
SECURITY_JWT_TTL_SECONDS=86400
```

### Servidor (Opcional - tiene valores por defecto)
```bash
SERVER_PORT=8080
```

### Spotify API (Opcional - solo si quieres búsqueda de música)
```bash
SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
```

**Cómo obtener credenciales de Spotify:**
1. Ve a https://developer.spotify.com/dashboard
2. Crea una nueva aplicación
3. Copia el Client ID y Client Secret

### Google OAuth (Opcional - solo si quieres login con Google)
```bash
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

**Cómo obtener credenciales de Google:**
1. Ve a https://console.cloud.google.com/
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google+ API" o "Google Identity Services"
4. Ve a "Credenciales" > "Crear credenciales" > "ID de cliente OAuth 2.0"
5. Tipo: Aplicación web
6. Orígenes autorizados: `http://localhost:5173` (desarrollo) y tu dominio de producción
7. URI de redirección autorizados: `http://localhost:5173` (desarrollo) y tu dominio de producción
8. Copia el Client ID y Client Secret

### Correo Electrónico (Opcional - solo si quieres enviar emails)
```bash
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS_ENABLE=true
```

## 🌐 Frontend (React/Vite)

### Google OAuth (Opcional - solo si quieres login con Google)
Crea un archivo `.env` en `frontend/web/` con:
```bash
VITE_GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
```

**Nota:** El Client ID debe ser el mismo que configuraste en el backend.

### API Base URL (Opcional - tiene valor por defecto)
```bash
VITE_API_BASE_URL=http://localhost:8080
```

Para producción:
```bash
VITE_API_BASE_URL=https://tu-dominio.com
```

## 📋 Resumen de Variables Mínimas Requeridas

### Para desarrollo local básico:
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/univibe
SPRING_DATASOURCE_USERNAME=univibe
SPRING_DATASOURCE_PASSWORD=univibe
SECURITY_JWT_SECRET=REDACTED_JWT_SECRET
```

### Para funcionalidad completa:
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/univibe
SPRING_DATASOURCE_USERNAME=univibe
SPRING_DATASOURCE_PASSWORD=univibe
SECURITY_JWT_SECRET=REDACTED_JWT_SECRET
SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Frontend (.env en frontend/web/)
VITE_GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
VITE_API_BASE_URL=http://localhost:8080
```

## 🐳 Docker Compose

Si usas Docker Compose, puedes definir las variables en el archivo `docker-compose.yml` o en un archivo `.env` en la raíz del proyecto:

```bash
# .env (en la raíz del proyecto)
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/univibe
SPRING_DATASOURCE_USERNAME=univibe
SPRING_DATASOURCE_PASSWORD=univibe
SECURITY_JWT_SECRET=REDACTED_JWT_SECRET
SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

## ⚠️ Notas Importantes

1. **SECURITY_JWT_SECRET**: Debe ser una cadena base64 válida de al menos 64 caracteres. Puedes generar una con:
   ```bash
   openssl rand -base64 64
   ```

2. **Google OAuth**: El Client ID debe ser el mismo en backend y frontend.

3. **Spotify API**: Si no configuras estas variables, la búsqueda de música mostrará un mensaje indicando que no está configurada, pero las otras opciones (URL directa) funcionarán.

4. **Google OAuth**: Si no configuras estas variables, el botón de Google no aparecerá o no funcionará, pero el login tradicional seguirá funcionando.

5. **Base de datos**: Asegúrate de que PostgreSQL esté corriendo y que la base de datos `univibe` exista antes de iniciar el backend.

## 🔒 Seguridad

- **NUNCA** subas archivos `.env` con credenciales reales a Git
- Usa diferentes credenciales para desarrollo y producción
- Rota las claves secretas periódicamente
- Para producción, usa un gestor de secretos (AWS Secrets Manager, HashiCorp Vault, etc.)




# News Explorer

News Explorer es una aplicación web full stack que permite buscar noticias por palabra clave, registrarse, iniciar sesión y guardar artículos en una cuenta personal.

## Aplicación desplegada

Frontend:

https://www.news-explorer-joshua21.mooo.com

API:

https://news-explorer-api-joshua21.mooo.com

## Repositorios

Frontend:

https://github.com/JoshuaSanchez21/news-explorer-frontend

Backend:

https://github.com/JoshuaSanchez21/news-explorer-backend

## Funcionalidades principales

- Búsqueda de noticias mediante una API externa.
- Visualización de resultados en tarjetas.
- Persistencia de la última búsqueda en Local Storage.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante JWT.
- Persistencia de sesión después de recargar la página.
- Ruta protegida para artículos guardados.
- Guardado y eliminación de artículos.
- Estado visual del marcador de artículos.
- Página de artículos guardados.
- Conteo de artículos y palabras clave más frecuentes.
- Diseño responsive para escritorio, tablet y dispositivos móviles.

## Tecnologías utilizadas

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Fetch API
- Local Storage
- ESLint
- Node.js
- npm

## Requisitos previos

Para ejecutar el proyecto localmente necesitas:

- Node.js
- npm
- Git
- Un navegador web moderno
- Conexión a Internet

Comprueba las instalaciones con:

```bash
node --version
npm --version
git --version
```

## Instalación local

Clona el repositorio:

```bash
git clone https://github.com/JoshuaSanchez21/news-explorer-frontend.git
```

Entra al proyecto:

```bash
cd news-explorer-frontend
```

Instala las dependencias:

```bash
npm ci
```

Si no dispones de `package-lock.json`, puedes utilizar:

```bash
npm install
```

## Ejecutar en desarrollo

Inicia el servidor de Vite:

```bash
npm run dev
```

Vite mostrará la dirección local, normalmente:

```text
http://localhost:5173
```

Abre esa dirección en el navegador.

## Compilar para producción

Genera la versión optimizada:

```bash
npm run build
```

El resultado se guarda en:

```text
dist/
```

Puedes probar el build localmente con:

```bash
npm run preview
```

## Verificar el código

Ejecuta ESLint:

```bash
npm run lint
```

También puedes comprobar errores de espacios con:

```bash
git diff --check
```

## Scripts disponibles

```text
npm run dev       Inicia Vite en modo desarrollo
npm run build     Genera el build de producción
npm run preview   Sirve localmente el build generado
npm run lint      Ejecuta ESLint
```

## Rutas de la aplicación

```text
/             Página principal y búsqueda de noticias
/saved-news   Página protegida de artículos guardados
```

`/saved-news` solo está disponible para usuarios autenticados. Si un usuario no autorizado intenta acceder directamente, es redirigido a la página principal y se muestra la ventana de autenticación.

## Autenticación

Después de iniciar sesión correctamente, el backend devuelve un JWT que se almacena en Local Storage.

El token se utiliza para realizar solicitudes protegidas como:

```text
GET    /users/me
GET    /articles
POST   /articles
DELETE /articles/:articleId
```

Al recargar la página, la aplicación utiliza el JWT almacenado para recuperar los datos del usuario y mantener la sesión.

## Comunicación con la API

La API de producción está disponible en:

```text
https://news-explorer-api-joshua21.mooo.com
```

Las solicitudes relacionadas con autenticación y artículos están centralizadas en:

```text
src/utils/MainApi.js
```

Las solicitudes de búsqueda de noticias están en:

```text
src/utils/NewsApi.js
```

## Estructura principal

```text
src/
├── components/
│   ├── About/
│   ├── App/
│   ├── Footer/
│   ├── Header/
│   ├── InfoTooltip/
│   ├── Login/
│   ├── Main/
│   ├── Navigation/
│   ├── NewsCard/
│   ├── NewsCardList/
│   ├── NothingFound/
│   ├── PopupWithForm/
│   ├── Preloader/
│   ├── ProtectedRoute/
│   ├── Register/
│   ├── SavedNews/
│   ├── SavedNewsHeader/
│   └── SearchForm/
├── contexts/
│   └── CurrentUserContext.js
├── hooks/
│   └── useFormWithValidation.js
├── images/
├── utils/
│   ├── MainApi.js
│   ├── NewsApi.js
│   └── constants.js
└── main.jsx
```

## Flujo de artículos guardados

Cuando un usuario autenticado guarda una noticia:

1. El frontend transforma los datos recibidos de la API de noticias.
2. Envía una solicitud `POST /articles`.
3. El artículo se almacena en MongoDB asociado al usuario.
4. El marcador de la tarjeta cambia a su estado activo.
5. El artículo aparece en `/saved-news`.

Al volver a pulsar el marcador o utilizar la papelera se envía:

```text
DELETE /articles/:articleId
```

## Despliegue

El frontend se compila con Vite y los archivos de `dist/` son servidos por Nginx en una máquina virtual de Google Cloud.

La aplicación utiliza HTTPS.

Para soportar React Router, Nginx utiliza una configuración equivalente a:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Esto permite acceder directamente a rutas como `/saved-news` sin obtener un error 404 del servidor web.

## Autor

Joshua Sánchez

Proyecto final de desarrollo web realizado como parte del programa de TripleTen.

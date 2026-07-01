# Frontend app (Vue.js)

This is the frontend part of the app, build with Vue 3 (Vite).

## Requirements

Before you begin make sure you have the following installed:

- Git
- Docker and Docker Compose

> **Important:** For the frontend to work, you have to have backend project running. See: `https://github.com/Sawczuk24427/laravel-api-docker`

## How to setup project locally

**1. Clone Git repository onto your disc:**
`git clone https://github.com/Sawczuk24427/vue-frontend-docker`

**2. Go into the project directory:**
`cd vue-frontend-docker`

**3. Backend communication**
Make sure your local backend works on the same port specified in `src/axios.js`

**4. Launch Docker container:**
`docker compose up -d`

**5. Install all NPM packages:**
`docker compose exec node npm install`

**6. Run development server (Vite):**
`docker compose exec node npm run dev`

## App accesss

After succesfully launching the server, it will be accessible in your browser under:
**http://localhost:5173**

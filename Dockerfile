# Imagen oficial de Playwright: ya trae Chromium y todas las librerías del sistema
# ⚠️ IMPORTANTE: la versión del tag debe coincidir con la de @playwright/test en package.json
# Verifica tu versión con: npx playwright --version
FROM mcr.microsoft.com/playwright:v1.65.1-noble

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia primero los archivos de dependencias (aprovecha el cache de Docker)
COPY package*.json ./

# Instala las dependencias exactas del package-lock.json (reproducibilidad total)
RUN npm ci

# Copia el resto del código del framework
COPY . .

# Comando por defecto: corre toda la suite (UI + API + DB)
# ⚠️ Requiere que PostgreSQL y PetClinic estén arriba (lo maneja docker-compose)
CMD ["npm", "run", "test:all"]
FROM node:latest AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build app
RUN npm run build:docker

FROM nginx:latest AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

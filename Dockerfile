FROM node:20-alpine AS builder
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .

RUN npm install
# Copy app files
COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.23.1-alpine as production
# Copy built assets from builder
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY docker_build/nginx.default.conf /etc/nginx/conf.d/default.conf
# Set current working directory
WORKDIR /usr/share/nginx/html/
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

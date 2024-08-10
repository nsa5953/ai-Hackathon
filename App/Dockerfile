FROM node:14 AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Use an official nginx image to serve the app
FROM nginx:alpine

# Copy the build artifacts from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

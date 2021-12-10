# Stage 1: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# To enable angular routing
COPY nginx.conf /etc/nginx/nginx.conf

# Stage 2: Move build file from local to docker

# Copy the build output to replace the default nginx contents.
COPY ./dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
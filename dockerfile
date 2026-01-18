# Use official Nginx image
FROM nginx:alpine

# Copy website files to Nginx directory
COPY website /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

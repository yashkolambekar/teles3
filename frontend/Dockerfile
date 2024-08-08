# Use the official PHP image with Apache
FROM php:8.3-apache

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm neovim && \
    apt-get clean

# Set the working directory
WORKDIR /app

# Copy the application files to the working directory
COPY . .

#ARGS
ARG VITE_BACKEND_API

# Ensure the entrypoint script is executable
RUN chmod +x ./entrypoint.sh

# Export the Args to .env file
RUN ./entrypoint.sh

# Run the build process
RUN npm install && npm run build

# Remove default Nginx static files and move the built files
RUN rm -rf /var/www/html/* && \
    mv ./dist/* /var/www/html/

# Change ownership of the files
RUN chown -R www-data:www-data /var/www/html

RUN a2enmod rewrite

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
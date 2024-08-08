
# Use the official PHP image with Apache
FROM php:8.3-apache

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
git \
curl \
zip \
unzip \
neovim

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the application code
COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN touch /var/www/html/database/database.sqlite

# Install Laravel dependencies
RUN composer install

# Change ownership of the files
RUN chown -R www-data:www-data /var/www/html

RUN a2enmod rewrite

RUN mv .env.example .env

RUN php artisan key:generate

RUN php artisan migrate --force

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
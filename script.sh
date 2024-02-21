#!/bin/bash

# Abrir una nueva terminal en el primer escritorio y ejecutar 'npm start'
cd /AE-Front-End
gnome-terminal --tab -- npm start &

# Cambiar al segundo escritorio
xdotool set_desktop 2

# Abrir una nueva terminal en el segundo escritorio y ejecutar 'php artisan serve'
cd /AE-Back-end
gnome-terminal --tab -- php artisan serve &

# Cambiar al tercer escritorio
xdotool set_desktop 3

# Abrir una nueva terminal en el tercer escritorio y ejecutar 'php artisan serve' con PHP 7
cd /auditoria_casinos
gnome-terminal --tab -- php7.0 artisan serve --port=8001 &

# Cambiar de vuelta al primer escritorio
xdotool set_desktop 1


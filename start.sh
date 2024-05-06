#!/bin/bash

# Set directorio actual
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Lanza el servidor de Laravel
gnome-terminal --tab --title="Servidor Laravel Audit" --working-directory="$DIR" -- bash -c "cd auditoria_casinos && php7.0 artisan serve --port=8001; exec bash"

sleep 5

gnome-terminal --tab --title="Servidor Laravel Seva" --working-directory="$DIR" -- bash -c "cd AE-Back-end && php artisan serve; exec bash"

sleep 5

# Lanza el servidor de Node.js en otra nueva terminal
gnome-terminal --tab --title="Servidor Node.js" --working-directory="$DIR" -- bash -c "cd AE-Front-End && npm start --host 0.0.0.0
; exec bash"


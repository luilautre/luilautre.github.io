# Utilise une image officielle de PHP
FROM php:8.2-cli

# Copie ton code dans le conteneur
COPY . /app
WORKDIR /app

# Commande pour lancer le serveur PHP intégré
CMD ["php", "-S", "0.0.0.0:10000", "-t", "."]

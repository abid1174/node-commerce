#!/bin/bash

echo "
FROM alpine:3
RUN apk add --no-cache openssh openssl && apk add --update coreutils
" | docker build -t localhost/generate-jwt-keys -

docker run -it --rm localhost/generate-jwt-keys /bin/sh -c '
    ssh-keygen -t rsa -b 2048 -m PEM -P "" -f jwtRS256.key

    openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

    echo -e "\e[32m\e[1mTo setup the JWT keys, please add the following values to your .env file:\e[0m"
    echo "JWT_PUBLIC_KEY_BASE64=\"$(base64 -i -w 0 jwtRS256.key.pub)\""
    echo "JWT_PRIVATE_KEY_BASE64=\"$(base64 -i -w 0 jwtRS256.key)\""
'
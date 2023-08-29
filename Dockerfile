FROM        alpine
LABEL       author="Lintx X7" maintainer="lintxid@warceuproject.dev"
RUN         apk update && apk upgrade \ 
            && apk add --no-cache nodejs npm git curl
RUN         npm i -g yarn pm2 typescript node-gyp

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

# COPY        ./entrypoint.sh /entrypoint.sh
CMD         [ "/bin/sh" ]
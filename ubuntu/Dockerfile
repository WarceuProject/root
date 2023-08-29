FROM        ubuntu:v1.0.0
LABEL       author="Lintx X7" maintainer="lintxid@warceuproject.dev"
RUN         apt update && apt upgrade -y \
            && service ssh start
USER        lintxid
ENV         USER=lintxid HOME=/home/$USER
WORKDIR     /home/$USER

COPY        ./entrypoint.sh /entrypoint.sh
CMD         /bin/sudo su - lintxid
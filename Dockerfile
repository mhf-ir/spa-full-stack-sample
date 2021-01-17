# Copyright(c) 2021 aasaam software development group
FROM node:15-stretch-slim

LABEL org.label-schema.name="aasaam rename-me" \
  org.label-schema.description="aasaan rename-me" \
  org.label-schema.url=$CI_PROJECT_URL \
  org.label-schema.vendor="aasaam" \
  maintainer="Muhammad Hussein Fattahizadeh <m@mhf.ir>"

RUN export DEBIAN_FRONTEND=noninteractive ; \
  export LANG=en_US.utf8 ; \
  export LC_ALL=C.UTF-8 ; \
  apt-get update -y \
  && apt-get -y upgrade && apt-get install -y --no-install-recommends curl build-essential ca-certificates \
  && echo 'cache = "/tmp/npm"' > /root/.npmrc \
  && npm -g update \
  && npm -g install pm2 \
  && cd /tmp \
  && rm -r /var/lib/apt/lists/* && rm -rf /tmp && mkdir /tmp && chmod 777 /tmp && truncate -s 0 /var/log/*.log

ADD app /

RUN cd /app \
  && npm install --production

EXPOSE 9000/tcp 9001/tcp 9002/tcp

STOPSIGNAL SIGTERM
WORKDIR /app
CMD ["pm2-runtime", "--json", "ecosystem.config.js"]

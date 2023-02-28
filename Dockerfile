##
## Copyright 2023
##
## This will build front end container running nginx
## Author: Gurvinder Singh (sinny777@gmail.com)
##
## docker buildx build --platform linux/amd64,linux/arm64 --build-arg CLIENT_BUILD_ENV=production -t sinny777/hukam:latest --push .
## docker build --build-arg CLIENT_BUILD_ENV=production -t sinny777/hukam:v1.0.1 .
## docker run -it -d -p 4200:80 --network my-network --name hukam hukam:latest
## docker run -it -p 8080:8080 --name hukam sinny777/hukam:latest
##

FROM node:16-alpine as client-build

LABEL version="1.0" \
      description=" Gurvinder Singh hukam Webpage " \
      author="Gurvinder Singh <sinny777@gmail.com>" \
      hukam="http://www.gurvinder.info"

RUN mkdir -p /app
WORKDIR /app

ARG CLIENT_BUILD_ENV=production

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    make \
    g++ \
    git \
    --update bash && rm -rf /var/cache/apk/*

COPY . /app
COPY ./build.sh /app/

RUN chgrp -R 0 /app && \
    chmod -R g=u /app && \
    chmod 755 /app/build.sh && \
    /app/build.sh $CLIENT_BUILD_ENV && \
    apk del build-dependencies

FROM nginx:1.13.5
# FROM nginxinc/nginx-unprivileged
COPY --from=client-build app/dist/hukam /usr/share/nginx/html
COPY --from=client-build app/src/config/nginx.conf /etc/nginx/nginx.conf
# COPY --from=client-build ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g=u /var/cache/nginx /var/run /var/log/nginx

# USER 1001

ENV PORT 80

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]

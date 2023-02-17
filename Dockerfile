# grab the latest alpine for building from.
FROM alpine:latest as build

# requirements for building
RUN apk add nodejs
RUN apk add npm 

WORKDIR /usr/local/pokemon
COPY app/ ./

# install dependencies and build.
RUN npm ci
RUN npm run build 

FROM pierrezemb/gostatic as serve

WORKDIR /srv/http
COPY --from=build /usr/local/pokemon/build ./

WORKDIR /

ENTRYPOINT [ "/goStatic" ]
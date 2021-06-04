FROM node:14.16.0-alpine3.11 as builder

ARG  NPMRC

RUN echo $NPMRC | base64 -d > ~/.npmrc

WORKDIR /opt/container
COPY package.json /opt/container
COPY yarn.lock /opt/container

RUN yarn

FROM node:14.16.0-alpine3.11

WORKDIR /opt/container
COPY --from=builder /opt/container /opt/container

COPY .next/ /opt/container/.next

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

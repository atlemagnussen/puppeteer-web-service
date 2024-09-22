# Puppeteer as a web service in docker container

using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for the Web API


## Build

```sh
docker build --tag pdf-gen-app:v1.0 .

```

Test
```sh
docker run -d -p 3000:3000 pdf-gen-app:v1.0
```

NB! the image will be quite large, 2GB.  
Be aware when using paid container registry

## puppeteer

https://pptr.dev/guides/configuration

## Docker

See Puppeteers docker example for installing typical fonts:  
https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile

add fonts-noto-color-emoji for color emojis

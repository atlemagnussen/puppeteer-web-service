# Puppeteer web service Docker container

The [DockerFile](./Dockerfile) will install the latest stable version of Google Chrome in the container. And then run the puppeteer web service.

PORT is overridable as environment variable

## Build

```sh
cd app
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

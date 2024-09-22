# Puppeteer pdf gen as app service

using nodejs express

## puppeteer

https://pptr.dev/guides/configuration

## Docker

See Puppeteers docker example for installing typical fonts:  
https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile

add fonts-noto-color-emoji for color emojis

Build

```sh
docker build --tag pdf-gen-app:v1.0 .

```

Test
```sh
docker run -p 3000:3000 pdf-gen-app:v1.0
```
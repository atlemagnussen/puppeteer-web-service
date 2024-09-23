# Puppeteer Web Service

- [Puppeteer PDF generation](https://pptr.dev/guides/pdf-generation/)
- [Puppeteer Screenshots](https://pptr.dev/guides/screenshots/) 

as a HTTP REST service that accepts raw HTML and returns a PDF document or image.

using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for the Web API

## Container
see [DOCKER.md](./app/DOCKER.md) for how to build and run  

Recommended to run as a container with all necessary fonts for supporting all kinds of unicode characters

Works for all cloud services that supports containers



## Run locally (not container)

You need Google-Chrome or Chromium installed.

`app/src/generator.ts` is hard coded to point to `executablePath: '/usr/bin/google-chrome'` to work in container.  
It will work locally on Debian Linux based distros with the same path.  
For other distros, MacOS and Windows you probably need to to change `executablePath` 

Or switch to use [puppeteer bundled with chromium](https://www.npmjs.com/package/puppeteer)

```sh
cd app
npm i
npm run dev
```



## Testing

Simple test in the browser  
`http://localhost:3000/api/generate?html=hello`

Full test with a REST API Client like [Bruno](https://www.usebruno.com/) or [Postman](https://www.postman.com/product/api-client/)

```http
POST http://localhost:3000/api/generate
Content-Type: application/json
{ 
    "html": "<h1>Hello PDF</h1><p>🤡👽😂🥱😡😰🤮ᚠᚡᚢᚣᚤ</p>"
}
```

Test screenshot to image

```http
POST http://localhost:3000/api/generate
Content-Type: application/json
{ 
    "html": "<h1>Hello IMAGE</h1><p>🤡👽😂🥱😡😰🤮</p>",
    "options": {
        "fileType": "image"
    }
}
```


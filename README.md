# Docker Puppeteer PDF generator

- [Puppeteer PDF generation](https://pptr.dev/guides/pdf-generation/)
- [Puppeteer Screenshots](https://pptr.dev/guides/screenshots/) 

as a HTTP REST service that accepts raw HTML and returns a PDF document or image.

## Docker container
see [DOCKER.md](./app/DOCKER.md) for how to build and run  

Implemented a docker container image with all necessary fonts for supporting all kinds of unicode characters

Works for all cloud services that supports containers


## Run locally

You need Google-Chrome or Chromium installed.

`app/src/generator.ts` is hard coded to point to `executablePath: '/usr/bin/google-chrome'` to work in a docker container.  
It will work locally on Linux debian based distro with the same path.  
For other distros, MacOS and Windows you probably need to to change `executablePath` 

```sh
npm run dev
```

Simple test to see if working in the browser  
`http://localhost:3000/api/generate?html=hello`

Full test can be done with an REST API Client like [Bruno](https://www.usebruno.com/) or [Postman](https://www.postman.com/product/api-client/)

```http
POST http://localhost:3000/api/generate
Content-Type: application/json
{ 
    "html": "<h1>Hello PDF</h1><p>🤡👽😂🥱😡😰🤮</p>"
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

## More Test scenarios for Unicode support

😂😁😂😂 🤡👽😂🥱😡😰🤮😷💩😺🫶🏽✊🏾👩🏿‍🦰🐺🐬🐖🐏🐈🐠🌝🌪️⚽

ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ

polish ŁłĄąĘęŚśŻżÓóŹźĆćŃń

turkish ben bir meleğim

ukraine я ангел

arabic: يا إلهي هذا أنا

japan 私は天使です

chinese 四書五經

Indisk হেল্ল' ইন দ্য হেচ্চ

bengali আমি একজন দেবদূত

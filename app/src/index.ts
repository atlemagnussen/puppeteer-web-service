// ***************************************************************************
// Puppeteer HTTP Service PDF Generator
// ***************************************************************************

import express from "express"
import { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ExportOptions } from "./models"
import { generate } from "./generator"
//import * as fs from "fs/promises" // for debugging incoming HTML

// App constants
const host = "::"
let port = 3000
if ((process.env.PORT))
    port = parseInt(process.env.PORT)

const apiPrefix = '/api'
  
// Create the Express app & setup middlewares
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '10mb'}))
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/}))
app.options('*', cors())

// ***************************************************************************

// Configure routes
const router = express.Router()

// index page
app.get('/', function (req: Request, res: Response) {
    return res.send(`<h1>ᚺᛖᛚᛚᛟ ᚹᛟᚱᛚᛞ</h1><p>ᚢᛊᛖ</p>`)
})

// api
app.get('/api', function (req: Request, res: Response) {
    console.log("root api")
    return res.send(`<p>ᚢᛊᛖ ᚠᛟᚱ PDF ᚷᛖᚾᛖᚱᚨᛏᛟᚾ</p>`)
})

// generate get url for test in browser
router.get("/generate", async (req: Request, res: Response) => {
    if (!req.query.html)
        return res.status(400).json({ error: 'Missing html' })

    let html = req.query.html as string
    console.log("html", html)
    return handle(res, html)
})

// post generator
router.post('/generate', async (req: Request, res: Response) => {
    if (!req.body.html)
        return res.status(400).json({ error: 'Missing html' })
    
    let options = null
    if (req.body.options)
        options = req.body.options

    const html = req.body.html
    // await fs.writeFile("debug.html", html) // for debugging incoming HTML
    return handle(res, html, options)
})

// debug raw
router.post("/pdf", bodyParser.text({ type: 'text/html' }), async (req: Request, res: Response) => {
    console.log("req.headers", req.headers)
    if (!req.body)
        return res.status(400).json({ error: 'Missing html' })
    
    console.log("req.body", req.body)
    const html = req.body
    //await fs.writeFile("debug.html", html)
    return handle(res, html)
})

async function handle(res: Response, html: string, options?: ExportOptions) {
    try {
        const gen = await generate(html, options)
        res.header(gen.headers)
        res.status(gen.status)
        return res.end(gen.body)
    }
    catch(err) {
        const errMsg = err.message
        console.error(errMsg)
        return res.status(400).json({ error: errMsg })
    }
}

app.use(apiPrefix, router)

// Start the server
app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)
})
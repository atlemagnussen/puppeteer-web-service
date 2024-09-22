import * as puppeteer from "puppeteer-core"
import { cloneDeep, merge } from "lodash"
import { ExportOptions, GenerateResponse } from "./models"
import * as fs from "fs/promises"
import * as path from "path"

const defaultOptions: ExportOptions = {
    fileType: "pdf",
    pdfOptions: {
        format: 'a4',
        margin: {
            bottom: "0.5cm",
            left: "1cm",
            right: "1cm",
            top: "0.5cm",
        },
        scale: 0.8,
        omitBackground: false,
        printBackground: true,
        displayHeaderFooter: false,
    },
    imageOptions: {
        type: "jpeg",
        quality: 90,
        fullPage: false,
        clip: {
            x: 0,
            y: 0,
            width: 800,
            height: 600
        }
    }
}

export async function generate(html: string, options?: ExportOptions): Promise<GenerateResponse> {

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        devtools: false,
        args: ["--no-sandbox"]
    })
    const page = await browser.newPage()
    page.setJavaScriptEnabled(false) // don't allow any javascript

    let finalOpts = cloneDeep(defaultOptions) as ExportOptions
    
    if (options) {
        console.log("incoming options", options)
        finalOpts = merge(finalOpts, options)
    }

    await page.setContent(html, { waitUntil: "networkidle0"})
    // page.setExtraHTTPHeaders({"Content-Type": "text/html;charset=utf-8"})
    
    console.log("content set, length=", html.length)

    if (finalOpts.fileType == "pdf") {

        await checkAndSetFooterHeader(finalOpts)

        const pdfBuffer = await page.pdf(finalOpts.pdfOptions)
        console.log("pdf created, length=", pdfBuffer.length)

        await browser.close()
    
        const res = {
            status: 200,
            body: pdfBuffer,
            headers: {
                "content-type": "application/pdf",
                "Content-Length": pdfBuffer.length
            }
        }
        return res
    }
    if (finalOpts.fileType == "image") {
        console.log("image type", finalOpts.imageOptions.type)
        
        const imageBuffer = await page.screenshot(finalOpts.imageOptions)
        console.log("image created, length=", imageBuffer.length)

        await browser.close()

        const res = {
            status: 200,
            body: imageBuffer,
            headers: {
                "content-type": finalOpts.imageOptions.type == "jpeg" ? "image/jpeg" : "image/png",
                "Content-Length": imageBuffer.length
            }
        }
        return res
    }
    return {
        status: 400,
        body: "no filetype for export provided",
        headers: {
            "content-type": "text/html"
        }
    }
}

async function checkAndSetFooterHeader(opts: ExportOptions) {
    if (!opts.pdfOptions.displayHeaderFooter)
        return

    if (!opts.pdfOptions.headerTemplate) {
        const headerTemplate = await readHtml("headerTemplate.html")
        opts.pdfOptions.headerTemplate = headerTemplate
    }
    
    if (!opts.pdfOptions.footerTemplate) {
        const footerTemplate = await readHtml("footerTemplate.html")
        opts.pdfOptions.footerTemplate = footerTemplate
    }
}

async function readHtml(filename: string) {
    const filePath = path.join(__dirname, "..", filename)
    const file = await fs.readFile(filePath, "utf-8")
    return file
}
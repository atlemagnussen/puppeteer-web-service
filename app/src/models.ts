import type { PDFOptions, ScreenshotOptions } from "puppeteer-core"

type ExportFileType = "pdf" | "image"

export interface GenerateResponse {
    status: number
    headers: Record<string, any>
    body: any
}

export interface ExportOptions {
    fileType: ExportFileType
    pdfOptions: PDFOptions
    imageOptions: ScreenshotOptions
}
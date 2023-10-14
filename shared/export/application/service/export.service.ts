import { Injectable, SerializeOptions } from '@nestjs/common';
import * as  handlebars from 'handlebars';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import { FilterResponseHelper } from 'shared/filter_response';
import { LogHelper } from 'shared/log';

@Injectable()
export class ExportService {
    constructor(
    ) { }

    async exportPdf(htmlRelativeUrl: string, options?: { htmlData?: any; fileName?: string; optionsPdf?: puppeteer.PDFOptions }) {
        try {
            if (!options) options = {};
            if (!options?.fileName) options['fileName'] = 'file.pdf';
            if (!options?.optionsPdf)
                options['optionsPdf'] = {
                    path: options?.fileName,
                    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                    printBackground: true,
                    format: 'A4',
                };

            else options['optionsPdf'] = {
                ...options['optionsPdf'],
                path: options?.fileName,
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                printBackground: true,
                format: 'A4',
            };

            const templatePath = htmlRelativeUrl;
            const template = fs.readFileSync(templatePath, 'utf8');

            const compiledTemplate = handlebars.compile(template);
            const htmlContent = compiledTemplate(options?.htmlData ?? {});
            const browser = await puppeteer.launch({
                headless: 'new'
            });
            const page = await browser.newPage();
            await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
            await page.emulateMediaType('screen');
            const PDF = await page.pdf(options.optionsPdf);
            await browser.close();
            return PDF;
        } catch (error) {
            console.log("🚀 ~ file: export.service.ts:48 ~ ExportService ~ exportPdf ~ error:", error)
            throw FilterResponseHelper.httpException('INTERNAL_SERVER_ERROR', 'Ocurrio un error al generar el documento pdf. Por favor, contacte a soporte.');
        }

    }
}

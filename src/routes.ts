import { Router, Request, Response } from 'express';
import pdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { prismaClient } from './databases/prismaClient';
import fs from 'fs';

const routes = Router();

routes.get('/products', async (req: Request, res: Response) => {
    const products = await prismaClient.products.findMany();
    res.json(products);
});


routes.get('/products/report', async (req: Request, res: Response) => {
    const fonts = {

        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    };
    const printer = new pdfPrinter(fonts);
    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: { font: 'Helvetica' },
        content: [{ text: 'Meu primeiro relatório em nodejs' }]
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
});
export { routes };

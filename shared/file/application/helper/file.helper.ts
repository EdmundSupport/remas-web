import { HttpService } from '@nestjs/axios';
import { readFileSync, statSync } from 'fs';
import * as path from 'path';
import { FilterResponseHelper } from 'shared/filter_response';

export class FileHelper {
    filePath = '';
    fileName = '';
    fileExtension = '';
    fileMime = '';
    fileSize = 0;
    fileBuffer: Buffer = null;
    fileBase64: string = null;
    httpService: HttpService;

    constructor(filePath: string, options?: { httpService?: HttpService }) {
        this.filePath = filePath;
        this.httpService = options.httpService
    }

    getName(filePathLocal: string = this.filePath) {
        const { name } = path.parse(filePathLocal);
        if (filePathLocal === this.filePath) this.fileName = name;
        return name;
    }

    getExtension(filePathLocal: string = this.filePath) {
        const { ext } = path.parse(filePathLocal);
        const extension = ext.replace('.', '').toLowerCase();
        if (filePathLocal === this.filePath) this.fileExtension = extension;
        return extension;
    }

    getMime(filePathLocal: string = this.filePath) {
        const extension = this.getExtension(filePathLocal);
        function getMimeLocal(extensionLocal: string) {
            if (extension == 'jpg') return 'image/jpg';
            if (extension == 'png') return 'image/png';
            if (extension == 'jpeg') return 'image/jpeg';
            if (extension == 'pdf') return 'application/pdf';
            throw FilterResponseHelper.httpException('INTERNAL_SERVER_ERROR', 'No se pudo determinar el mime del archivo.');
        }
        const mime = getMimeLocal(extension);
        if (filePathLocal === this.filePath) this.fileMime = mime;
        return mime;
    }

    getSize(filePathLocal: string = this.filePath) {
        const stats = statSync(filePathLocal);
        const size = stats.size;
        if (filePathLocal === this.filePath) this.fileSize = size;
        return size;
    }

    async getFile(filePathLocal: string = this.filePath, httpService: HttpService = this.httpService) {
        if (filePathLocal === this.filePath && this.fileBuffer) return this.fileBuffer;
        if (typeof filePathLocal === 'string' && filePathLocal.indexOf('http') == -1) {
            const fileBuffer = readFileSync(filePathLocal);
            if (filePathLocal === this.filePath) this.fileBuffer = fileBuffer;
            return fileBuffer;
        }
        if (typeof filePathLocal === 'string' && filePathLocal.indexOf('http') != -1) {
            const fileRequest = await httpService.axiosRef.get(filePathLocal, { responseType: 'arraybuffer' });
            const fileBuffer = fileRequest.data;
            if (filePathLocal === this.filePath) this.fileBuffer = fileBuffer;
            return fileBuffer;
        }
    }

    async toBase64(filePathLocal: string = this.filePath, httpService: HttpService = this.httpService) {
        if (filePathLocal === this.filePath && this.fileBase64) return this.fileBase64;
        const fileBuffer = await this.getFile(filePathLocal, httpService);
        const fileBase64 = `data:${this.getMime(filePathLocal)};base64,` + Buffer.from(fileBuffer).toString('base64');
        if (filePathLocal === this.filePath) this.fileBase64 = fileBase64;
        return fileBase64;
    }


}
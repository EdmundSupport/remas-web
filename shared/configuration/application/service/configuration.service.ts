import { INestApplication } from "@nestjs/common";
import { json, urlencoded } from "express";

export class ConfigurationService {
    constructor() { }

    init(app: INestApplication) {
        // app.useLogger(new LoggerService);
        app.setGlobalPrefix('api'); //TODO prefix dynamic by environment
        app.enableCors();
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ extended: true, limit: '50mb' }));
    }
}
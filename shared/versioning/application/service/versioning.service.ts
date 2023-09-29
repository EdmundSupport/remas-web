import { INestApplication, VersioningType } from "@nestjs/common";

export class VersioningService {
    constructor() { }

    init(app: INestApplication) {
        app.enableVersioning({
            defaultVersion: '1', //TODO version dynamic by environment
            type: VersioningType.URI,
        });
    }
}
import { INestApplication, ValidationPipe } from "@nestjs/common";

export class ValidationService {
    constructor() { }

    init(app: INestApplication) {
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
    }
}
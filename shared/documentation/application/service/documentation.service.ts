import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class DocumentationService {
    constructor() { }

    init(app: INestApplication) {
        const documentBuilder = new DocumentBuilder()
            .setTitle('API REMAS')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    // I was also testing it without prefix 'Bearer ' before the JWT
                    description: `Bearer <JWT>`,
                    name: 'Authorization',
                    bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
                    scheme: 'Bearer',
                    type: 'http', // I`ve attempted type: 'apiKey' too
                    in: 'Header'
                },
                'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
            )
            .build();

        const document = SwaggerModule.createDocument(app, documentBuilder);
        SwaggerModule.setup('docs', app, document);
    }
}
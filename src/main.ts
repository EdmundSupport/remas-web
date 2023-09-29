import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentationService } from 'shared/documentation/application/service/documentation.service';
import { ConfigurationService } from 'shared/configuration/application/service/configuration.service';
import { ValidationService } from 'shared/validation/application/service/validation.service';
import { VersioningService } from 'shared/versioning/application/service/versioning.service';
import { FilterResponseInterceptor } from 'shared/filter_response/infrastructure/interceptor/filter_response.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService = new ConfigurationService();
  configurationService.init(app);

  const versioningService = new VersioningService();
  versioningService.init(app);

  const validationService = new ValidationService();
  validationService.init(app);

  const documentationService = new DocumentationService();
  documentationService.init(app);

  app.useGlobalInterceptors(new FilterResponseInterceptor());

  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT');
  const HOST = config.get<number>('HOST');
  await app.listen(PORT, ()=>{
    console.log(`[API] ${HOST}:${PORT}/api/v1/`);
  });
}
bootstrap();

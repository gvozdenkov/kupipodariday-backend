import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'js-yaml';
import fs from 'fs';
import { AppModule } from './app.module';

var bootstrap = () => {
  NestFactory.create(AppModule).then((app) => {
    var configService = app.get(ConfigService);
    var PORT = configService.get('PORT');
    var BASE_PATH = configService.get('BASE_PATH');

    var openApiSpec = YAML.load(fs.readFileSync('docs/openapi.yaml', 'utf-8'));

    SwaggerModule.setup(`${BASE_PATH}/v1/docs`, app, openApiSpec);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:${PORT}`));
  });
};

bootstrap();

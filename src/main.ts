import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'js-yaml';
import fs from 'fs';
import { config } from '#config';
import { AppModule } from './app.module';

var { port: PORT, basePath: BASE_PATH } = config;

var bootstrap = () => {
  NestFactory.create(AppModule).then((app) => {
    var openApiSpec = YAML.load(fs.readFileSync('docs/openapi.yaml', 'utf-8'));

    SwaggerModule.setup(`${BASE_PATH}/v1/docs`, app, openApiSpec);

    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:${PORT}`));
  });
};

bootstrap();

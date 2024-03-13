import { NestFactory } from '@nestjs/core';
import { config } from '#config';
import { AppModule } from './app.module';

var { port: PORT } = config;

var bootstrap = () => {
  NestFactory.create(AppModule).then((app) =>
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)),
  );
};

bootstrap();

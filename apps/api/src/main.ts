import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const options = new DocumentBuilder()
    .setTitle('SASUGA API')
    .setDescription('sasuga, api...')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
}

bootstrap();

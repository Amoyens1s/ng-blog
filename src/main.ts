import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ArticleModule } from './article/article.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('前后端接口文档')
    .setVersion('1.0')
    .addTag('docs')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [ArticleModule],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

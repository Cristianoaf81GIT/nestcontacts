import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from './modules/root/app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(__dirname, '..', 'assets'));
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'));
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        user: 'user',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest contact api')
    .setDescription('Users contact api')
    .setVersion('1.0')
    .addTag('contacts')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      name: 'access_token',
      scheme: 'bearer',
      description: 'Enter jwt token',
    })
    .build();

  const documentCssCustom: SwaggerCustomOptions = {
    customCss: `
      .swagger-ui .topbar { 
        background-color: mediumseagreen !important; 
        min-height: 5rem; 
        color: #ffffff !important; 
      }
      .swagger-ui .topbar .wrapper .topbar-wrapper.a { 
        display: none; 
      }
      .swagger-ui .topbar .wrapper .topbar-wrapper img {
        content:url('\/contact.png\'); 
        width: 120px; 
        height:auto;        
      } 
     

    `,
    customSiteTitle: 'NestJs-Contacts',
    customfavIcon: '/favicon.png',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, documentCssCustom);

  await app.listen(9000);
}
bootstrap();

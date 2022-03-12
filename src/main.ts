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
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const documentCssCustom: SwaggerCustomOptions = {
    customCss: `
      .swagger-ui .topbar { 
        background-color: #2d3c4d !important; 
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
      body  {
       background-color: #2d3c4d;       
      } 
      .scheme-container {
        background-color: #2d3c4d;
        color: #ffffff;       
      }
      .swagger-ui .scheme-container {
        background-color: #2d3c4d;
        color: #ffffff;
        box-shadow: none;       
      }
      .description .renderedMarkdown > p {
        color: #ffffff;
      } 
      .title {
        color: #ffffff !important; 
      }  
      .swagger-ui a.nostyle, .swagger-ui a.nostyle:visited {
        color: #ffffff !important;
      } 
      .swagger-ui .expand-methods svg, .swagger-ui .expand-operation svg {
        height: 20px;
        fill: #ffffff;
        width: 20px;
      }
      svg.arrow { fill: #ffffff !important; }
      .swagger-ui .authorization__btn {
        background: none;
        border: none;
        padding: 0 10px;
        fill: #ffffff;
      }
      .swagger-ui .opblock .opblock-summary-description {
        color: #ffffff;
        flex: 1 1 auto;
        font-family: sans-serif;
        font-size: 13px;
        word-break: break-word;
      }
      .swagger-ui .model-box-control, .swagger-ui .models-control, .swagger-ui .opblock-summary-control {
        all: inherit;
        border-bottom: 0;
        cursor: pointer;
        flex: 1;
        padding: 0;
        color: tomato;
      }
      .swagger-ui .model-box-control, .swagger-ui .models-control, .swagger-ui .opblock-summary-control svg {
        fill: #ffffff;
      }
      .swagger-ui .model-title {
        color: #ffffff;
        font-family: sans-serif;
        font-size: 16px;
      }
      .swagger-ui .model-toggle:after {      
        background-color: #ffffff !important;
      }

      .swagger-ui .opblock .opblock-section-header {
        align-items: center;
        background: #2d3c4d;
        box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
        display: flex;
        min-height: 50px;
        padding: 8px 20px;
        color: #ffffff !important;
      }
      
      .swagger-ui .opblock .tab-header .tab-item.active h4 span {
        position: relative;
        color: #ffffff;
      }
      .swagger-ui .opblock-description-wrapper p, .swagger-ui .opblock-external-docs-wrapper p, .swagger-ui .opblock-title_normal p {
        color: wheat;
        font-family: sans-serif;
        font-size: 14px;
        margin: 0;
      }
      .swagger-ui .opblock .opblock-section-header h4 {
        color: #ffffff;
        flex: 1;
        font-family: sans-serif;
        font-size: 14px;
        margin: 0;
      }

      .swagger-ui .btn {
        background: transparent;
        border: 2px solid gray;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
        color: #ffffff;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 700;
        padding: 5px 23px;
        transition: all .3s;
      }
      
      .swagger-ui .tab li button.tablinks {
        background: none;
        border: 0;
        color: wheat;
        font-family: inherit;
        font-size: 1.0rem;
        font-weight: bold;
        padding: 0;
      }
      
      .swagger-ui .response-col_status {
        color: cadetblue;
        font-family: sans-serif;
        font-size: 14px;
      }

      .swagger-ui .response-col_description {
        width: 99%;
        color: #ffffff;
      }

      .swagger-ui .response-control-media-type--accept-controller select {
        border-color: lightgray;
      }

      .swagger-ui .response-control-media-type__accept-message {
        color: greenyellow;
        font-size: .7em;
      }

      .swagger-ui .parameter__name.required:after {
        color: mediumvioletred;
        content: "required";
        font-size: 10px;
        padding: 5px;
        position: relative;
        top: -6px;
      }

      .swagger-ui .parameter__name.required:after {
        color: navajowhite;
        content: "required";
        font-size: 10px;
        font-weight: 700;
        padding: 5px;
        position: relative;
        top: -6px;
      }

      .swagger-ui table thead tr td, .swagger-ui table thead tr th {
        border-bottom: 1px solid rgba(59,65,81,.2);
        color: #3b4151;
        font-family: sans-serif;
        font-size: 12px;
        font-weight: 700;
        padding: 12px 0;
        text-align: left;
        color: cadetblue;
      }

      .swagger-ui .parameter__name.required {
        font-weight: 700;
        color: white;
      }

      .swagger-ui .parameter__type {
        color: navajowhite;
        font-family: monospace;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 0;
      }

      .swagger-ui .parameter__extension, .swagger-ui .parameter__in {
        color: lightblue;
        font-family: monospace;
        font-size: 12px;
        font-style: italic;
        font-weight: 600;
      }
      
      .swagger-ui .model-box-control, .swagger-ui .models-control, .swagger-ui .opblock-summary-control {
        all: inherit;
        border-bottom: 0;
        cursor: pointer;
        flex: 1;
        padding: 0;
        color: lavender;
        fill: #ffffff;
      }
      
      .swagger-ui .model {
        color: #ffffff;
        font-family: monospace;
        font-size: 12px;
        font-weight: 300;
        font-weight: 600;
      }

      .swagger-ui .model .brace-close {
        color: #ffffff;
      } 

      .swagger-ui .prop-type {
        color: cadetblue;
      }

      .swagger-ui textarea {
        background: mintcream;
        border: none;
        border-radius: 4px;
        color: #3b4151;
        font-family: monospace;
        font-size: 12px;
        font-weight: 600;
        min-height: 280px;
        outline: none;
        padding: 10px;
        width: 100%;
      }

      .swagger-ui .btn {
        background: transparent;
        border: 2px solid gray;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
        color: #3b4151;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 700;
        padding: 5px 23px;
        transition: all .3s;
        color: grey !important;
      }

    `,
    customSiteTitle: 'NestJs-Contacts',
    customfavIcon: '/favicon.png',
  }; // 2d3c4d body

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, documentCssCustom);

  await app.listen(9000);
}
bootstrap();

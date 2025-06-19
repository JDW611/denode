import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerService {
    setup(app: INestApplication): void {
        const config = new DocumentBuilder()
            .setTitle('Denode 과제테스트')
            .setDescription('재고 관리 시스템 API')
            .setVersion('1.0')
            .addTag('Denode 과제테스트')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
    }
}

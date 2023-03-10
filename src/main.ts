import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT =  process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  const config =  new DocumentBuilder()
  .setTitle('GeofencingService')
  .setDescription('Test task for RightTech')
  .setVersion('1.0.0')
  .build()
  const SwaggerDoc  =  SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/doc', app, SwaggerDoc)
  await app.listen(PORT, () => console.log(`Started on port: ${PORT}`));
}
bootstrap();

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    always: true,
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    exceptionFactory: (errors) =>
      new BadRequestException(
        'VALIDATION_FAILED: ' +
        errors
          .map((v) => Object.values(v.constraints ?? {}))
          .flat().join('\n'))
  }))

  await app.listen(3000);
}
bootstrap();

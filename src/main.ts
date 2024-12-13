import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS to allow requests from your frontend (localhost:4000)
  app.enableCors({
    origin: ['http://localhost:4000'], // Allow only localhost:4000
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow credentials like cookies or authorization headers
  });

  await app.listen(3000);
}
bootstrap();

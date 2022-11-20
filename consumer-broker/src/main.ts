import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitmqServer from './rabbitmq-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  const server = new RabbitmqServer('amqp://localhost:5672');
  await server.start();
  await server.consume('broker-user-queue', (message) =>
    console.log(message.content.toString()),
  );
}
bootstrap();

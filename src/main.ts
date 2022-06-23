import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationsService } from './notifications/notifications.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await NotificationsService.initApp();
  await app.listen(3000, () => console.log('Server run on port: ', 3000));
}
bootstrap();

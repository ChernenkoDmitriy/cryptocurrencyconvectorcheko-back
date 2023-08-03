import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationsService } from './notifications/notifications.service';
// import { PurchaseService } from './purchase/purchase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await NotificationsService.initApp();
  // await PurchaseService.initProject();
  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log('Server run on port: ', port));
}
bootstrap();

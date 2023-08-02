import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationsService } from './notifications/notifications.service';
// import { PurchaseService } from './purchase/purchase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await NotificationsService.initApp();
  // await PurchaseService.initProject();
  await app.listen(process.env.PORT || 5000, () => console.log('Server run on port: ', 3000));
}
bootstrap();

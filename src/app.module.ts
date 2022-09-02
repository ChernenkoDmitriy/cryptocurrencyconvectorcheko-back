import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NotificationsModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    PurchaseModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

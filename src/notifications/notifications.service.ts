import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class NotificationsService {
  @Interval(10000)
  async sendNotification() {
    console.log(`${Date()}`);
  }
}

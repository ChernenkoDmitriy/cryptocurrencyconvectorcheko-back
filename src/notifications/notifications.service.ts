import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import admin from 'firebase-admin';

const INTERVAL_MS = 60000 * 2;

@Injectable()
export class NotificationsService {
  @Interval(INTERVAL_MS)
  async sendNotification() {
    admin
      .messaging()
      .send({
        data: {
          type: 'warning',
          content: 'A new weather warning has been created!',
        },
        topic: 'rateNotification',
        android: {
          priority: 'high'
        }
      })
      .then((response) => { console.log('Successfully sent message:', response); })
      .catch((error) => { console.log('Error sending message:', error); });
  }
  static async initApp() {
    const serviceAccount: any = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import admin from 'firebase-admin';

const serviceAccount: any = {
  type: 'service_account',
  project_id: 'cryptocurrencyconvectorcheko',
  private_key_id: 'ebfca172c7d8ccc827bfa21fa518d3a4adc3692b',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/m6S2ESTk0ohO\n/+hJCJl6WLr/gHpvCocbcOrv/ElsE3lhNLni30zCb1hpAtZrD0aNyVFpBdOBwEip\nYiAYJdSM7MhVd6s2TFug36rHKZJmw8u+hrS0BYBC6QGWLtSEhoejZG3IOIEqmdF0\nUaY90Pjinr81ww1EWE6UiEXkYDgFYaOuaZj75+HYtQCkaMezFFY6m8Gq1omQDUA4\nl39FH4A2uVZ3ZjTgrKY/jqaQhgj7+wx3d4HLWrADmPgMpobGcSOx6jeajlPS5int\n/HIl0ICK2XqMkeltjSGbUz4MVqdFk2V+NLIcet1d8iBJk5vSP6TyOZ1NZp8z+kjb\no3zd1dZpAgMBAAECggEAGhxI4AmqjCcXbaKIYilylr5QL0CwDoEyA56J2W25CKoH\ntKQlf6Hb2TQoqVi6ZOj2PZyVRDlHxwrvq+tkAb5n/lNHAoSV94aExwGryUukOG5O\njbZYGh8UySls7q0Ph0a45Z5qKmpuyaIf7ZixzYM0Y1dsKZScsndRMAL4+UPWZn8Z\nFJIdpDRQB7Qc4ocmNAJ+ImMrtFD3VjouTENmQKCzZiO4CxTNK6D5IvVyavntgTde\nVW3AvfJhMusLxXww275IjtFfT348wVI/5of3ANv4D4Aiyirz6lUoid6NpjTAVRXg\neA6u9QGe0xh1rqqe/mw15BOm/RjiN1J5gipkFihEXQKBgQDk8ze1WnClrfY5hW/y\nHyr7OpsgTVDslrpu9TwtasdotbC4vAOdQwD2d3hwj3Z9wi6kBxPtzo1jDMZYvUX/\nGjz0dmbtNtA2jQirymC72vtRR6RALl1YtHsHa8w4qhwckVFYz4+5q8puRNnP6gHU\nrGtY3vgb/gZozTBmGr/z8Z1wtQKBgQDWPvvZfQxWJOhlmT3aXhDdtW3KjNX2xp1W\nq/FHv2ooPBHGyww+/FcCgOqURW5h79bXMSxJGgPpFF6NYRQrvvJaldwa/R0GM/w6\nxoPtIi3tNknonSWQYMBwexme2UUnZ/PzPnAj9JTy9xcSykQn2RDSTiHvl23RxGGt\n0cwANfVDZQKBgQDDeOytR8Q5kGdTARxs6jN2P7lGQPzAoogWSAbS+AG84rM5Zjzn\nvddKlwIbiEEwaeQMY4aeWOXaFYQbK65heXNlfNmv2ka27H7kvWsNuI8t/C6+JVfJ\nbn5D/cNk9cf+lAuR+dTKP2Qb9WjJ3Q8nFvan7+aBb8blH5sc8eXFTxqOqQKBgQC9\ngW6hvMNZu0G5BGg6rDO8+EsJ+7MSmjH3xRUhwoVy21daAKZvXCLWexODXTq69DuT\nktI6QwGsfDD6WyFNZJPYXnAXi0XOA9OaZZex/CaliPys/buJTptJowlRgZtytLeK\ns/LbSu8pTjghjbnliVIgw62u0MH55vwDlOweT5wHJQKBgQCuIMPaHvvK0nELrqOa\n7VcPut+M75SS89J6ilm2Sv8O6zRBvFWOVJl4vacBXxczeXZjoxqsVp5JMKaDuUjo\nwnioMQVxG3F9EbgL8sHiSgI9f1gESX5zZDM2Lx6DIt/Izfjm9bdJHTnCSZ/vegGs\nYQlO2HKcUB8FdE3kJnQLIBAhLQ==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-76cbs@cryptocurrencyconvectorcheko.iam.gserviceaccount.com',
  client_id: '114485517372335409648',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-76cbs%40cryptocurrencyconvectorcheko.iam.gserviceaccount.com',
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class NotificationsService {
  @Interval(30000)
  async sendNotification() {
    const message = {
      data: {
        type: 'warning',
        content: 'A new weather warning has been created!',
      },
      topic: 'rateNotification',
    };
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }
}

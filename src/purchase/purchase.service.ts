import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const iap = require('in-app-purchase');
const assert = require('assert');

@Injectable()
export class PurchaseService {
  static async initProject() {
    google.options({
      auth: new JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        null,
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        ['https://www.googleapis.com/auth/androidpublisher'],
      ),
    });

    const iapTestMode = process.env.IAP_TEST_MODE === 'false';

    iap.config({
      appleExcludeOldTransactions: true,
      applePassword: process.env.APPLE_SHARED_SECRET,

      googleServiceAccount: {
        clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      },

      test: iapTestMode,
    });
  }

  async checkReceipt(body) {
    const { userId, appType, purchase } = body;

    assert(['ios', 'android'].includes(appType));
    console.log(process.env.ANDROID_PACKAGE_NAME);

    const receipt =
      appType === 'ios'
        ? purchase.transactionReceipt
        : {
            packageName: process.env.ANDROID_PACKAGE_NAME,
            productId: body.productId,
            purchaseToken: body.purchaseToken,
            subscription: true,
          };

    return await this.processPurchase(appType, userId, receipt);
  }

  async processPurchase(app, userId, receipt) {
    const androidGoogleApi = google.androidpublisher({ version: 'v3' });
    await iap.setup();
    const validationResponse = await iap.validate(receipt);
    assert(
      (app === 'android' && validationResponse.service === 'google') ||
        (app === 'ios' && validationResponse.service === 'apple'),
    );

    const purchaseData = iap.getPurchaseData(validationResponse);
    purchaseData[0].expiryTimeMillis = new Date(
      parseInt(purchaseData[0].expiryTimeMillis, 10),
    );
    const dateNow = new Date();
    let isSubscriptionActive = true;

    if (dateNow > purchaseData[0].expiryTimeMillis) {
      isSubscriptionActive = !isSubscriptionActive;
    }

    const firstPurchaseItem = purchaseData[0];

    const { productId } = firstPurchaseItem;

    if (app === 'android' && validationResponse.acknowledgementState === 0) {
      return await androidGoogleApi.purchases.subscriptions.acknowledge({
        packageName: process.env.ANDROID_PACKAGE_NAME,
        subscriptionId: productId,
        token: receipt.purchaseToken,
      });
    }
    return { data: purchaseData[0], isSubscriptionActive };
  }
}

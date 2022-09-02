import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  async show() {
    return {
      minAndroidVersion: '1.0.2',
      minIosVersion: '1.0.2',
      recommendedAndroidVersion: '1.0.2',
      recommendedIosVersion: '1.0.2',
    };
  }
}

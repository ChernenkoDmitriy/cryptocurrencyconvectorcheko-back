import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post()
  async checkReceipt(@Body() body) {
    return await this.purchaseService.checkReceipt(body);
  }
}

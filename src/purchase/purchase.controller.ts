import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CheckReceiptDto } from './purchase.dto/check.receipt.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post()
  async checkReceipt(@Body() body: CheckReceiptDto) {
    return await this.purchaseService.checkReceipt(body);
  }
}

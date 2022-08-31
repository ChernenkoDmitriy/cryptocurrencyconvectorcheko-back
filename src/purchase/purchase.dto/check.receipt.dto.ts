import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';
export class CheckReceiptDto {
  @IsNotEmpty()
  @IsString()
  appType: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  packageName: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  purchaseTime: number;

  @IsNotEmpty()
  @IsNumber()
  purchaseState: number;

  @IsNotEmpty()
  @IsString()
  purchaseToken: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  autoRenewing: boolean;

  @IsNotEmpty()
  @IsBoolean()
  acknowledged: boolean;
}

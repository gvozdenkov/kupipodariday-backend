import { PickType } from '@nestjs/swagger';
import { Offer } from '#offer/entities/offer.entity';
import { IsString } from 'class-validator';

export class CreateOfferDto extends PickType(Offer, ['amount', 'hidden']) {
  @IsString()
  wishId: string;
}

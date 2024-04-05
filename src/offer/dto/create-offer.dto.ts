import { PickType } from '@nestjs/swagger';
import { Offer } from '#offer/entities/offer.entity';

export class CreateOfferDto extends PickType(Offer, ['item', 'amount', 'hidden']) {}

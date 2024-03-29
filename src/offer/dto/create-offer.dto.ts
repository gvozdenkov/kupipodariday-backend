import { Offer } from '#offer/entities/offer.entity';
import { PickType } from '@nestjs/swagger';

export class CreateOfferDto extends PickType(Offer, ['amount', 'hidden']) {}

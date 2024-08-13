export class CreateOrderDto {
  readonly type: string;
  readonly symbol: string;
  readonly side: string;
  readonly usdtQuantity: number;
  readonly price: number;
  readonly quantity: string;
}

export class CancelOrderDto {
  readonly symbol: string;
  readonly orderId: number;
}

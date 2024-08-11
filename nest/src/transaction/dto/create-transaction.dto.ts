export class CreateTransactionDto {
  readonly portfolioId: any;
  readonly coinId: number;
  readonly date: Date;
  readonly amount: number;
  readonly fees: number;
  readonly description: string;
  readonly originCurrency: string;
  readonly costPerUnitInUsd: number;
  readonly costPerUnitInCurrency: number;
}

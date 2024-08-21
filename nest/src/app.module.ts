import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthzModule } from './authz/authz.module';
import { CoinModule } from './coin/coin.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CurrencyModule } from './currency/currency.module';
import { TransactionModule } from './transaction/transaction.module';
import { BinanceModule } from './binance/binance.module';
import { DonationsModule } from './donations/donations.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    UserModule,
    AuthzModule,
    CoinModule,
    PortfolioModule,
    CurrencyModule,
    TransactionModule,
    BinanceModule,
    DonationsModule,
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthzModule } from './authz/authz.module';
import { CoinModule } from './coin/coin.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CurrencyModule } from './currency/currency.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    UserModule,
    AuthzModule,
    CoinModule,
    PortfolioModule,
    CurrencyModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthzModule } from './authz/authz.module';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [UserModule, AuthzModule, CoinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

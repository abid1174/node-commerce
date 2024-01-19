import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '@app/apps/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [SharedModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY ?? 'secret123123',
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES_TIME ?? '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [AuthService],
})
export class AuthModule {}

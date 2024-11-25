import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, RefreshToken } from 'src/db/dto';
import { UserResponse } from 'src/db/types';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() dto: CreateUser) {
    const createdUser = await this.service.signup(dto);
    return new UserResponse(createdUser);
  }

  @Public()
  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() dto: CreateUser) {
    return this.service.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  refresh(@Body() dto: RefreshToken) {
    return this.service.refresh(dto.refreshToken);
  }
}

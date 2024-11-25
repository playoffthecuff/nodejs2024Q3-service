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
import { CreateUser } from 'src/db/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UsePipes(new ValidationPipe())
  // @Post('signup')
  // async signup(@Body() dto: CreateUser) {
  //   return this.service.signup();
  // }

  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() dto: CreateUser) {
    return this.service.login(dto);
  }
}

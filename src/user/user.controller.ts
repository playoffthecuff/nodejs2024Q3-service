import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UpdatePassword } from 'src/db/dto';
import { UserEntity } from 'src/db/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.userService.getUsers().map((u) => new UserEntity(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return new UserEntity(this.userService.getUser(id));
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() dto: CreateUser) {
    this.userService.createUser(dto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePassword,
  ) {
    this.userService.updatePassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.userService.deleteUser(id);
  }
}

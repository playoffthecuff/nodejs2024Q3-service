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
import { UserResponse } from 'src/db/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return users.map((u) => new UserResponse(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() dto: CreateUser) {
    const createdUser = await this.userService.create(dto);
    return new UserResponse(createdUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePassword,
  ) {
    const updatedUser = await this.userService.update(id, dto);
    return new UserResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.userService.remove(id);
  }
}

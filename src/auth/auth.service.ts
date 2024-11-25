import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/db/dto';
import { User } from 'src/db/types';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.userService.findOneByLogin(dto.login);
    if (!user || user.password !== dto.password) throw new ForbiddenException();
    const payload = {
      sub: user.id,
      login: user.login,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME ?? '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME ?? '24h',
      }),
    };
  }

  async signup(dto: CreateUserDto) {
    const existedUser = await this.userService.findOneByLogin(dto.login);
    if (existedUser) return existedUser;
    const salt = await bcrypt.genSalt(
      process.env.CRYPT_SALT ? +process.env.CRYPT_SALT : 10,
    );
    const password = await bcrypt.hash(dto.password, salt);
    const newUser: User = {
      id: crypto.randomUUID(),
      login: dto.login,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    return this.userService.save(newUser);
  }
}

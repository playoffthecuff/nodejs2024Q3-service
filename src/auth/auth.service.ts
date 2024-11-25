import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/db/dto';
import { User } from 'src/db/types';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

type Payload = {
  sub: string;
  login: string;
  iat?: string;
  exp?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.userService.findOneByLogin(dto.login);
    if (!user) throw new ForbiddenException();
    const compareResult = await bcrypt.compare(dto.password, user.password);
    console.log(compareResult);
    if (!compareResult) throw new ForbiddenException();
    const payload: Payload = {
      sub: user.id,
      login: user.login,
    };
    return this.generateTokens(payload);
  }

  async generateTokens(payload: Payload) {
    console.log(payload);
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

  async refresh(token: string) {
    let payload: Payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { iat, exp, ...p } = payload;
      return this.generateTokens(p);
    } catch {
      throw new ForbiddenException();
    }
  }
}

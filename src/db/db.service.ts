import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './types';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class DbService {
  users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  createUser(userDto: CreateUserDto) {
    const newUser: User = {
      id: crypto.randomUUID(),
      login: userDto.login,
      password: userDto.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    user.password = dto.newPassword;
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException();
    this.users.splice(userIndex, 1);
  }
}

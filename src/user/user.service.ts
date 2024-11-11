import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/db/dto';
import { User } from 'src/db/types';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  getUsers() {
    return this.dbService.users;
  }

  getUser(id: string) {
    const user = this.dbService.users.find((u) => u.id === id);
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
    this.dbService.users.push(newUser);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = this.dbService.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    user.password = dto.newPassword;
  }

  deleteUser(id: string) {
    const userIndex = this.dbService.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException();
    this.dbService.users.splice(userIndex, 1);
  }
}

import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/db/dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  getUsers() {
    return this.dbService.getUsers();
  }

  getUser(id: string) {
    return this.dbService.getUser(id);
  }

  createUser(userDto: CreateUserDto) {
    this.dbService.createUser(userDto);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    this.dbService.updatePassword(id, dto);
  }

  deleteUser(id: string) {
    this.dbService.deleteUser(id);
  }
}

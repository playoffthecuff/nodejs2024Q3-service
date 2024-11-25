import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdatePasswordDto } from 'src/db/dto';
import { User } from 'src/db/types';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(dto: CreateUserDto) {
    const existedUser = await this.findOneByLogin(dto.login);
    if (existedUser) return existedUser;
    const newUser: User = {
      id: crypto.randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return await this.repository.save(newUser);
  }

  async save(user: User) {
    return await this.repository.save(user);
  }

  async findOneByLogin(login: string) {
    return this.repository.findOneBy({
      login,
    });
  }

  async update(id: string, dto: UpdatePasswordDto) {
    if (!dto.newPassword && !dto.oldPassword) throw new BadRequestException();
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    const updatedUser = await this.repository.save(user);
    updatedUser.createdAt = +updatedUser.createdAt;
    updatedUser.updatedAt = +updatedUser.updatedAt;
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}

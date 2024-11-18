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
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(userDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOneBy({
      login: userDto.login,
    });
    if (existedUser) return existedUser;
    const newUser: User = {
      id: crypto.randomUUID(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = this.userRepository.create(newUser);
    return await this.userRepository.save(createdUser);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    if (!dto.newPassword && !dto.oldPassword) throw new BadRequestException();
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    const updatedUser = await this.userRepository.save(user);
    updatedUser.createdAt = +updatedUser.createdAt;
    updatedUser.updatedAt = +updatedUser.updatedAt;
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}

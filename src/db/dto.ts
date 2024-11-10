import { IsString } from 'class-validator';

export interface CreateUserDto {
  login: string;
  password: string;
}

export class CreateUser implements CreateUserDto {
  @IsString() login: string;
  @IsString() password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePassword implements UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

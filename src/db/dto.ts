import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Album, Artist, User } from './types';

export type CreateUserDto = Pick<User, 'login' | 'password'>;

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

export type ArtistDto = Omit<Artist, 'id'>;

export class CreateArtist implements ArtistDto {
  @IsString() name: string;
  @IsBoolean() grammy: boolean;
}

export class UpdateArtist implements ArtistDto {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsBoolean() grammy: boolean;
}

export type AlbumDto = Omit<Album, 'id'>;

export class CreateAlbum implements AlbumDto {
  @IsString() name: string;
  @IsInt() year: number;
  @IsOptional() @IsString() artistId: string | null;
}

export class UpdateAlbum implements AlbumDto {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsInt() year: number;
  @IsOptional() @IsString() artistId: string | null;
}

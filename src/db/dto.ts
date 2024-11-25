import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Album, Artist, Track, User } from './types';

export type CreateUserDto = Pick<User, 'login' | 'password'>;

export class CreateUser implements CreateUserDto {
  @IsString() login: string;
  @IsString() password: string;
}

export class RefreshToken {
  @IsString() refreshToken: string;
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

export type TrackDto = Omit<Track, 'id'>;

export class CreateTrack implements TrackDto {
  @IsString() name: string;
  @IsOptional() @IsString() albumId: string;
  @IsOptional() @IsString() artistId: string;
  @IsInt() duration: number;
}

export class UpdateTrack implements TrackDto {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsString() albumId: string;
  @IsOptional() @IsString() artistId: string;
  @IsOptional() @IsInt() duration: number;
}

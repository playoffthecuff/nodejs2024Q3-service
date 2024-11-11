import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album, Artist, Track, User } from './types';
import { AlbumDto, ArtistDto, CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
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

  getArtists() {
    return this.artists;
  }

  getArtist(id: string) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  createArtist(dto: ArtistDto) {
    const artist: Artist = {
      id: crypto.randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    this.artists.push(artist);
  }

  updateArtist(id: string, dto: Partial<ArtistDto>) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    Object.assign(artist, dto);
  }

  deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    if (artistIndex === -1) throw new NotFoundException();
    this.artists.splice(artistIndex, 1);
  }

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  createAlbum(dto: AlbumDto) {
    if (dto.artistId && !this.artists.find((v) => v.id === dto.artistId))
      throw new ForbiddenException();
    const newAlbum: Album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    this.albums.push(newAlbum);
  }

  updateAlbum(id: string, dto: Partial<AlbumDto>) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException();
    const artist = this.artists.find((a) => a.id === dto.artistId);
    if (!artist) throw new ForbiddenException();
    Object.assign(album, dto);
  }

  deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    if (albumIndex === -1) throw new NotFoundException();
    this.albums.splice(albumIndex, 1);
  }
}

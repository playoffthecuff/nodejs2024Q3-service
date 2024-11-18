import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDto } from 'src/db/dto';
import { Album } from 'src/db/types';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private repository: Repository<AlbumEntity>,
  ) {}

  async getAlbums() {
    return await this.repository.find();
  }

  async getAlbum(id: string) {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new NotFoundException();
    return album;
  }

  async createAlbum(dto: AlbumDto) {
    if (!dto.name && !dto.year) throw new BadRequestException();
    const newAlbum: Album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    return await this.repository.save(newAlbum);
    // if (
    //   dto.artistId &&
    //   !this.dbService.artists.find((v) => v.id === dto.artistId)
    // )
    //   throw new BadRequestException();
    // const newAlbum: Album = {
    //   id: crypto.randomUUID(),
    //   name: dto.name,
    //   year: dto.year,
    //   artistId: dto.artistId ?? null,
    // };
    // this.dbService.albums.push(newAlbum);
    // return newAlbum;
  }

  async updateAlbum(id: string, dto: Partial<AlbumDto>) {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new NotFoundException();
    // const artist = this.dbService.artists.find((a) => a.id === dto.artistId);
    // if (!artist) throw new BadRequestException();
    Object.assign(album, dto);
    return await this.repository.save(album);
  }

  async deleteAlbum(id: string) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
    // const albumIndex = this.dbService.albums.findIndex((a) => a.id === id);
    // if (albumIndex === -1) throw new NotFoundException();
    // const favIndex = this.dbService.favorites.albums.findIndex(
    //   (aId) => aId === id,
    // );
    // if (favIndex !== -1) this.dbService.favorites.albums.splice(favIndex, 1);
    // this.dbService.tracks
    //   .filter((t) => t.albumId === id)
    //   .forEach((t) => (t.albumId = null));
    // this.dbService.albums.splice(albumIndex, 1);
  }
}

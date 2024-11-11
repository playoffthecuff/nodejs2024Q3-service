import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AlbumDto } from 'src/db/dto';
import { Album } from 'src/db/types';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  getAlbums() {
    return this.dbService.albums;
  }

  getAlbum(id: string) {
    const album = this.dbService.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  createAlbum(dto: AlbumDto) {
    if (
      dto.artistId &&
      !this.dbService.artists.find((v) => v.id === dto.artistId)
    )
      throw new BadRequestException();
    const newAlbum: Album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    this.dbService.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, dto: Partial<AlbumDto>) {
    const album = this.dbService.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException();
    const artist = this.dbService.artists.find((a) => a.id === dto.artistId);
    if (!artist) throw new BadRequestException();
    Object.assign(album, dto);
    return album;
  }

  deleteAlbum(id: string) {
    const albumIndex = this.dbService.albums.findIndex((a) => a.id === id);
    if (albumIndex === -1) throw new NotFoundException();
    const favIndex = this.dbService.favorites.albums.findIndex(
      (aId) => aId === id,
    );
    if (favIndex !== -1) this.dbService.favorites.albums.splice(favIndex, 1);
    this.dbService.tracks
      .filter((t) => t.albumId === id)
      .forEach((t) => (t.albumId = null));
    this.dbService.albums.splice(albumIndex, 1);
  }
}

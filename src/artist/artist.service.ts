import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ArtistDto } from 'src/db/dto';
import { Artist } from 'src/db/types';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  getArtists() {
    return this.dbService.artists;
  }

  getArtist(id: string) {
    const artist = this.dbService.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  createArtist(dto: ArtistDto) {
    const artist: Artist = {
      id: crypto.randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    this.dbService.artists.push(artist);
  }

  updateArtist(id: string, dto: Partial<ArtistDto>) {
    const artist = this.dbService.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    Object.assign(artist, dto);
  }

  deleteArtist(id: string) {
    const artistIndex = this.dbService.artists.findIndex((a) => a.id === id);
    if (artistIndex === -1) throw new NotFoundException();
    const favIndex = this.dbService.favorites.artists.findIndex(
      (aId) => aId === id,
    );
    if (favIndex !== -1) this.dbService.favorites.artists.splice(favIndex, 1);
    this.dbService.albums
      .filter((a) => a.artistId === id)
      .forEach((a) => (a.artistId = null));
    this.dbService.tracks
      .filter((t) => t.artistId === id)
      .forEach((a) => (a.artistId = null));
    this.dbService.artists.splice(artistIndex, 1);
  }
}

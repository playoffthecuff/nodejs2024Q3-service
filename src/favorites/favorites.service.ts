import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoritesResponse } from 'src/db/types';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  getFavorites() {
    const favorites: FavoritesResponse = {
      albums: this.dbService.albums.filter((a) =>
        this.dbService.favorites.albums.includes(a.id),
      ),
      artists: this.dbService.artists.filter((a) =>
        this.dbService.favorites.artists.includes(a.id),
      ),
      tracks: this.dbService.tracks.filter((a) =>
        this.dbService.favorites.tracks.includes(a.id),
      ),
    };
    return favorites;
  }

  addTrack(id: string) {
    if (!this.dbService.tracks.find((t) => t.id === id))
      throw new UnprocessableEntityException();
    this.dbService.favorites.tracks.push(id);
  }

  deleteTrack(id: string) {
    const trackIndex = this.dbService.favorites.tracks.findIndex(
      (i) => i === id,
    );
    if (trackIndex === -1) throw new NotFoundException();
    this.dbService.favorites.tracks.splice(trackIndex, 1);
  }

  addAlbum(id: string) {
    if (!this.dbService.albums.find((t) => t.id === id))
      throw new UnprocessableEntityException();
    this.dbService.favorites.albums.push(id);
  }

  deleteAlbum(id: string) {
    const albumIndex = this.dbService.favorites.albums.findIndex(
      (i) => i === id,
    );
    if (albumIndex === -1) throw new NotFoundException();
    this.dbService.favorites.albums.splice(albumIndex, 1);
  }

  addArtist(id: string) {
    if (!this.dbService.artists.find((t) => t.id === id))
      throw new UnprocessableEntityException();
    this.dbService.favorites.artists.push(id);
  }

  deleteArtist(id: string) {
    const artistIndex = this.dbService.favorites.artists.findIndex(
      (i) => i === id,
    );
    if (artistIndex === -1) throw new NotFoundException();
    this.dbService.favorites.artists.splice(artistIndex, 1);
  }
}

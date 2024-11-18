import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getFavorites() {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['artists', 'albums', 'tracks'],
      where: {},
    });
    if (!favorites) {
      return this.favoritesRepository.save(
        this.favoritesRepository.create({
          artists: [],
          albums: [],
          tracks: [],
        }),
      );
    }
    delete favorites.id;
    return favorites;
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new UnprocessableEntityException();
    let favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['tracks'],
    });
    if (!favorites) {
      favorites = this.favoritesRepository.create({ tracks: [] });
    }
    if (!favorites.tracks.some((t) => t.id === id)) {
      favorites.tracks.push(track);
    }
    return await this.favoritesRepository.save(favorites);
  }

  async deleteTrack(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['tracks'],
      where: {},
    });
    if (!favorites || !favorites.tracks.some((t) => t.id === id))
      throw new NotFoundException();
    favorites.tracks = favorites.tracks.filter((t) => t.id !== id);
    return await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new UnprocessableEntityException();
    let favorites = await this.favoritesRepository.findOne({
      relations: ['albums'],
      where: {},
    });
    if (!favorites) {
      favorites = this.favoritesRepository.create({ albums: [] });
    }
    if (!favorites.albums.some((t) => t.id === id)) {
      favorites.albums.push(album);
    }
    return await this.favoritesRepository.save(favorites);
  }

  async deleteAlbum(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['albums'],
      where: {},
    });
    if (!favorites || !favorites.albums.some((t) => t.id === id))
      throw new NotFoundException();
    favorites.albums = favorites.albums.filter((t) => t.id !== id);
    return await this.favoritesRepository.save(favorites);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new UnprocessableEntityException();
    let favorites = await this.favoritesRepository.findOne({
      relations: ['artists'],
      where: {},
    });
    if (!favorites) {
      favorites = this.favoritesRepository.create({ artists: [] });
    }
    if (!favorites.artists.some((t) => t.id === id)) {
      favorites.artists.push(artist);
    }
    return await this.favoritesRepository.save(favorites);
  }

  async deleteArtist(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      relations: ['artists'],
      where: {},
    });
    if (!favorites || !favorites.artists.some((t) => t.id === id))
      throw new NotFoundException();
    favorites.artists = favorites.artists.filter((t) => t.id !== id);
    return await this.favoritesRepository.save(favorites);
  }
}

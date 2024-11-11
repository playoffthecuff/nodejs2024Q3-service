import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track, User } from './types';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favorites: Favorites = { artists: [], tracks: [], albums: [] };
}

import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from './types';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}

import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ArtistDto } from 'src/db/dto';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  getArtists() {
    return this.dbService.getArtists();
  }

  getArtist(id: string) {
    return this.dbService.getArtist(id);
  }

  createArtist(dto: ArtistDto) {
    this.dbService.createArtist(dto);
  }

  updateArtist(id: string, dto: Partial<ArtistDto>) {
    return this.dbService.updateArtist(id, dto);
  }

  deleteArtist(id: string) {
    this.dbService.deleteArtist(id);
  }
}

import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AlbumDto } from 'src/db/dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  getAlbums() {
    return this.dbService.getAlbums();
  }

  getAlbum(id: string) {
    return this.dbService.getAlbum(id);
  }

  createAlbum(dto: AlbumDto) {
    this.dbService.createAlbum(dto);
  }

  updateAlbum(id: string, dto: AlbumDto) {
    this.dbService.updateAlbum(id, dto);
  }

  deleteAlbum(id: string) {
    this.dbService.deleteAlbum(id);
  }
}

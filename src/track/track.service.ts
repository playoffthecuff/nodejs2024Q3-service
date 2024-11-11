import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { TrackDto } from 'src/db/dto';
import { Track } from 'src/db/types';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  getTracks() {
    return this.dbService.tracks;
  }

  getTrack(id: string) {
    const track = this.dbService.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  createTrack(dto: TrackDto) {
    if (
      dto.artistId &&
      !this.dbService.artists.find((a) => a.id === dto.artistId)
    )
      throw new BadRequestException();
    if (dto.albumId && !this.dbService.albums.find((a) => a.id === dto.albumId))
      throw new BadRequestException();
    const newTrack: Track = {
      id: crypto.randomUUID(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
    };
    this.dbService.tracks.push(newTrack);
  }

  updateTrack(id: string, dto: TrackDto) {
    const track = this.dbService.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException();
    if (
      dto.artistId &&
      !this.dbService.artists.find((a) => a.id === dto.artistId)
    )
      throw new BadRequestException();
    if (dto.albumId && !this.dbService.albums.find((a) => a.id === dto.albumId))
      throw new BadRequestException();
    Object.assign(track, dto);
  }

  deleteTrack(id: string) {
    const trackIndex = this.dbService.tracks.findIndex((t) => t.id === id);
    if (trackIndex === -1) throw new NotFoundException();
    this.dbService.tracks.splice(trackIndex, 1);
  }
}

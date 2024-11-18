import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackDto } from 'src/db/dto';
import { Track } from 'src/db/types';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private repository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const track = await this.repository.findOneBy({ id });
    if (!track) throw new NotFoundException();
    return track;
  }

  async create(dto: TrackDto) {
    const existedTrack = await this.repository.findOneBy({ name: dto.name });
    if (existedTrack) return existedTrack;
    const newTrack: Track = {
      id: crypto.randomUUID(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
    };
    return await this.repository.save(newTrack);
  }

  async update(id: string, dto: TrackDto) {
    const track = await this.repository.findOneBy({ id });
    if (!track) throw new NotFoundException();
    Object.assign(track, dto);
    return await this.repository.save(track);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}

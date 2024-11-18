import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDto } from 'src/db/dto';
import { Artist } from 'src/db/types';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private repository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const artist = await this.repository.findOneBy({ id });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async create(dto: ArtistDto) {
    const existedArtist = await this.repository.findOneBy({ name: dto.name });
    if (existedArtist) return existedArtist;
    const newArtist: Artist = {
      id: crypto.randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    return await this.repository.save(newArtist);
  }

  async updateArtist(id: string, dto: Partial<ArtistDto>) {
    const artist = await this.repository.findOneBy({ id });
    if (!artist) throw new NotFoundException();
    Object.assign(artist, dto);
    return await this.repository.save(artist);
  }

  async deleteArtist(id: string) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}

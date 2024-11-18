import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDto } from 'src/db/dto';
import { Album } from 'src/db/types';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private repository: Repository<AlbumEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new NotFoundException();
    return album;
  }

  async create(dto: AlbumDto) {
    const newAlbum: Album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    return await this.repository.save(newAlbum);
  }

  async update(id: string, dto: Partial<AlbumDto>) {
    const album = await this.repository.findOneBy({ id });
    if (!album) throw new NotFoundException();
    Object.assign(album, dto);
    return await this.repository.save(album);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}

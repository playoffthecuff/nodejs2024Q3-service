import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbum, UpdateAlbum } from 'src/db/dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.albumService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createAlbum(@Body() dto: CreateAlbum) {
    return await this.albumService.createAlbum(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateAlbum,
  ) {
    return await this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.albumService.deleteAlbum(id);
  }
}

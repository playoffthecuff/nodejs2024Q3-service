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
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createAlbum(@Body() dto: CreateAlbum) {
    this.albumService.createAlbum(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateAlbum,
  ) {
    this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.albumService.deleteAlbum(id);
  }
}

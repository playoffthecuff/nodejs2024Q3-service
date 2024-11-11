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
//GET /album - get all albums
//Server should answer with status code 200 and all albums records
//GET /album/:id - get single album by id
//Server should answer with status code 200 and and record with id === albumId if it exists
//Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
//Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist
//POST /album - create new album
//Server should answer with status code 201 and newly created record if request is valid
//Server should answer with status code 400 and corresponding message if request body does not contain required fields
//PUT /album/:id - update album info
//Server should answer with status code 200 and updated record if request is valid
//Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
//Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist
//DELETE /album/:id - delete album
//Server should answer with status code 204 if the record is found and deleted
//Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
//Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist

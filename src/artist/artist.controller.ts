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
import { ArtistService } from './artist.service';
import { CreateArtist, UpdateArtist } from 'src/db/dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(@Body() dto: CreateArtist) {
    this.artistService.createArtist(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtist,
  ) {
    this.artistService.updateArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.artistService.deleteArtist(id);
  }
}

// GET /artist - get all artists
// Server should answer with status code 200 and all artists records
// GET /artist/:id - get single artist by id
// Server should answer with status code 200 and and record with id === artistId if it exists
// Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist
// POST /artist - create new artist
// Server should answer with status code 201 and newly created record if request is valid
// Server should answer with status code 400 and corresponding message if request body does not contain required fields
// PUT /artist/:id - update artist info
// Server should answer with status code 200 and updated record if request is valid
// Server should answer with status code 400 and corresponding message if artist is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist
// DELETE /artist/:id - delete album
// Server should answer with status code 204 if the record is found and deleted
// Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist

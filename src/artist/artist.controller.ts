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

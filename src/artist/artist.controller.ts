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
  async getArtists() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.artistService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createArtist(@Body() dto: CreateArtist) {
    return await this.artistService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtist,
  ) {
    return await this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.artistService.remove(id);
  }
}

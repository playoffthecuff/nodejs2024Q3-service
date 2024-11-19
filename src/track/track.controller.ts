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
import { TrackService } from './track.service';
import { CreateTrack, UpdateTrack } from 'src/db/dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async geTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTrack(@Body() dto: CreateTrack) {
    return await this.trackService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrack,
  ) {
    return await this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.trackService.remove(id);
  }
}

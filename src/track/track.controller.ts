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
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  geTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(@Body() dto: CreateTrack) {
    this.trackService.createTrack(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrack,
  ) {
    this.trackService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.trackService.deleteTrack(id);
  }
}

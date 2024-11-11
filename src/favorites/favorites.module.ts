import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { DbModule } from 'src/db/db.module';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [DbModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'favorites_artists',
    joinColumn: { name: 'favoritesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artistId', referencedColumnName: 'id' },
  })
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'favorites_albums',
    joinColumn: { name: 'favoritesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'albumId', referencedColumnName: 'id' },
  })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'favorites_tracks',
    joinColumn: { name: 'favoritesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trackId', referencedColumnName: 'id' },
  })
  tracks: TrackEntity[];
}

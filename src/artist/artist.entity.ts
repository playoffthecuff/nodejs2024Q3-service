import { AlbumEntity } from 'src/album/album.entity';
import { Artist } from 'src/db/types';
import { TrackEntity } from 'src/track/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist, { cascade: true })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist, { cascade: true })
  tracks: TrackEntity[];
}

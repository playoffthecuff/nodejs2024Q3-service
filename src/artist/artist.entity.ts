import { Artist } from 'src/db/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  grammy: boolean;
}

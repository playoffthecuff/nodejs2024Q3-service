import { UserEntity } from 'src/user/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends UserEntity {
  @Column()
  accessToken: string;
  @Column()
  refreshToken: string;
}

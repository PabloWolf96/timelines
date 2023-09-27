import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @Column()
  name: string;
}

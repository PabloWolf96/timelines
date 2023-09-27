import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import * as argon2 from 'argon2';

@Entity()
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  full_name: string;
  @Column({
    unique: true,
    length: 80,
    type: 'varchar',
  })
  email: string;
  @Column({
    unique: true,
    length: 16,
    type: 'varchar',
  })
  username: string;
  @Column({
    length: 150,
    type: 'varchar',
  })
  biography: string;
  @Column({
    length: 90,
    type: 'varchar',
  })
  link: string;
  @Column('varchar')
  password: string;
  @Column('boolean')
  is_active: boolean;
  @Column('boolean')
  is_banned: boolean;
  @Column('smallint')
  role: number;
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  @BeforeInsert()
  fillDefaults() {
    this.is_active = true;
    this.biography = '';
    this.link = '';
    this.is_banned = false;
    this.role = 0;
  }
}

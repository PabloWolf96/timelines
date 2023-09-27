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
    type: 'string',
  })
  full_name: string;
  @Column({
    type: 'string',
    unique: true,
    length: 80,
  })
  email: string;
  @Column({
    type: 'string',
    unique: true,
    length: 16,
  })
  username: string;
  @Column({
    type: 'string',
    length: 150,
  })
  biography: string;
  @Column({
    type: 'string',
    length: 90,
  })
  link: string;
  @Column('string')
  password: string;
  @Column('boolean')
  is_active: boolean;
  @Column('boolean')
  is_banned: boolean;
  @Column('tinyint')
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

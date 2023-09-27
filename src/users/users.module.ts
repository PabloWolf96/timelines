import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/Entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}

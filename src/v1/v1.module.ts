import { Module } from '@nestjs/common';
import { UserModule } from './User/users.module';

@Module({
  imports: [UserModule],
})
export class V1Module {}

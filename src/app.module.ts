import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/Services/config.service';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeormConfig()), V1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

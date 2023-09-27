import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
class ConfigService {
  get(key: string): string {
    return process.env[key];
  }
  isProduction(): boolean {
    return this.get('MODE') == 'PRODUCTION';
  }
  getTypeormConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: this.get('DB_NAME'),
      username: this.get('DB_USER'),
      password: this.get('DB_PASSWORD'),
      port: Number(this.get('DB_PORT')),
      entities: ['dist/**/*.entity{.ts, .js}'],
      migrations: ['dist/migrations/*{.ts, .js}'],
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}
export const configService = new ConfigService();

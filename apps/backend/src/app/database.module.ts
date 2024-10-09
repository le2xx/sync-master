import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get<string>('POSTGRES_USER'),
          host: configService.get<string>('POSTGRES_HOST'),
          database: configService.get<string>('POSTGRES_DB'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          port: +configService.get<number>('POSTGRES_PORT'),
        });
        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}

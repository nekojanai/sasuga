import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres' as 'postgres',
      host: environment.DB_HOST,
      port: environment.DB_PORT,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: environment.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
  ]
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { WelcomeController } from './welcome.controller';
import { CrashController } from './crash.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'petclinic',
      password: 'petclinic',
      database: 'petclinic',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OwnerModule,
  ],
  controllers: [WelcomeController, CrashController],
})
export class AppModule {}

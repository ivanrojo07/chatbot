import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ChatModule } from './chat/chat.module';
import { SociodemographicModule } from './sociodemographic-info/sociodemographic.module';
import { AlcaldiasModule } from './alcaldias/alcaldias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'toor'),
        database: configService.get<string>('DB_NAME', 'db_name'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    BotModule,
    AuthModule,
    UsersModule,
    ChatModule,
    SociodemographicModule,
    AlcaldiasModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}

import { Module, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { ChatModule } from 'src/chat/chat.module';
import { SociodemographicInfoWizard } from './wizards/sociodemographic-info.wizard';
import { session } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
import { AlcaldiasModule } from 'src/alcaldias/alcaldias.module';
import { SociodemographicModule } from 'src/sociodemographic-info/sociodemographic.module';

@Module({
  imports: [
    AlcaldiasModule,
    SociodemographicModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      botName: 'prueba_ivan_bot',
      useFactory: (configService: ConfigService) => ({
        botName: 'prueba_ivan_bot',
        token: configService.get<string>('TELEGRAM_TOKEN')!,
        middlewares: [session()], // Obligatorio para usar Wizards/Escenas
      }),
    }),
    ConfigModule,
    ChatModule,
  ],
  providers: [BotService, SociodemographicInfoWizard],
  exports: [BotService],
  controllers: [BotController],
})
export class BotModule implements OnModuleDestroy {
  private readonly logger = new Logger(BotModule.name);

  constructor(private botService: BotService) {
    // Lanzar el bot en background sin esperar
    setImmediate(async () => {
      try {
        await this.botService.launch();
      } catch (error) {
        this.logger.error('Error initializing Telegram bot', error);
      }
    });
  }

  async onModuleDestroy() {
    try {
      await this.botService.stop();
    } catch (error) {
      this.logger.warn('Error stopping bot:', error);
    }
  }
}

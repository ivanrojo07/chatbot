import { Module, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';

@Module({
  imports: [ConfigModule],
  providers: [BotService],
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

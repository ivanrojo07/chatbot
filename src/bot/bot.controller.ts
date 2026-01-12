import { Controller, Post, Body, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Get('status')
  getStatus() {
    return { message: 'Bot is running' };
  }

  @Post('send-message')
  async sendMessage(@Body() body: { chatId: number; message: string }) {
    try {
      const bot = this.botService.getBot();
      await bot.telegram.sendMessage(body.chatId, body.message);
      return { success: true, message: 'Message sent' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Context, InjectBot, Start, Update } from 'nestjs-telegraf';
import { ChatService } from 'src/chat/chat.service';
import { Scenes, Telegraf, Context as TelegrafContext } from 'telegraf';
import { Message } from 'telegraf/types';

@Update()
@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
  private isLaunched = false;
  constructor(
    private readonly chatService: ChatService,
    @InjectBot(process.env.TELEGRAM_BOT_NAME)
    private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  @Start()
  async onStart(@Context() ctx: Scenes.SceneContext) {
    await ctx.reply('Bienvenido al bot.');
    if (ctx.from) {
      const chat = this.chatService.createOrUpdate({
        chatId: ctx.from?.id.toString(),
        chatName: ctx.from?.username || 'Unknown',
      });
      await ctx.scene.enter('sociodemographic-info-wizard'); // Entra al flujo de preguntas
    }
  }

  getBot() {
    return this.bot;
  }
}

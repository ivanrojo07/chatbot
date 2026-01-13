import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Start, Update } from 'nestjs-telegraf';
import { ChatService } from 'src/chat/chat.service';
import { Scenes, Telegraf } from 'telegraf';
import { Message } from 'telegraf/types';

@Update()
@Injectable()
export class BotService {
  private bot: Telegraf;
  private readonly logger = new Logger(BotService.name);
  private isLaunched = false;
  constructor(private readonly chatService: ChatService) {}

  // constructor(
  //   private configService: ConfigService,
  //   private readonly chatService: ChatService,
  // ) {
  //   const token = this.configService.get<string>('TELEGRAM_TOKEN');

  //   if (!token) {
  //     this.logger.warn(
  //       'TELEGRAM_TOKEN is not defined in environment variables',
  //     );
  //     return;
  //   }

  //   this.bot = new Telegraf(token);
  //   this.setupMiddleware();
  //   this.setupCommands();
  // }

  //   private setupMiddleware() {
  //     // Middleware opcional para logging
  //     this.bot.use((ctx, next) => {
  //       const message = ctx.message as Message.TextMessage;
  //       if (message?.text) {
  //         this.logger.log(`Message from ${ctx.from?.username}: ${message.text}`);
  //       }
  //       return next();
  //     });
  //   }

  //   private setupCommands() {
  //     // Comando /start
  //     this.bot.command('start', (ctx) => {
  //       const chatId = ctx.chat.id;
  //       console.log(ctx.chat);
  //       const chat = this.chatService.createOrUpdate({
  //         chatId: chatId.toString(),
  //         chatName: ctx.from?.username || 'Unknown',
  //       });
  //       console.log(chat);
  //       console.log(`Bot started in chat ${chatId}`);
  //       ctx.reply(
  //         '¡Bienvenido al bot! Usa /help para ver los comandos disponibles.',
  //       );
  //     });

  //     // Comando /help
  //     this.bot.command('help', (ctx) => {
  //       const helpMessage = `
  // Comandos disponibles:
  // /start - Inicia el bot
  // /help - Muestra esta ayuda
  // /echo [texto] - Repite el texto que envíes
  //       `;
  //       ctx.reply(helpMessage);
  //     });

  //     // Comando /echo
  //     this.bot.command('echo', (ctx) => {
  //       const message = ctx.message as Message.TextMessage;
  //       const text = message?.text?.replace('/echo', '').trim() || '';
  //       if (text) {
  //         ctx.reply(`Echoing: ${text}`);
  //       } else {
  //         ctx.reply('Por favor, proporciona un texto después de /echo');
  //       }
  //     });

  //     // Manejo de mensajes de texto generales
  //     this.bot.on('text', (ctx) => {
  //       const message = ctx.message as Message.TextMessage;
  //       ctx.reply(`Recibí tu mensaje: "${message.text}"`);
  //     });
  //   }

  //   private async initializationMessage() {
  //     // Este método se ejecuta cuando el bot inicia
  //     this.logger.log('========================================');
  //     this.logger.log('🤖 Bot de Telegram iniciado correctamente');
  //     this.logger.log(`⏰ Hora: ${new Date().toLocaleString()}`);
  //     this.logger.log('📋 Comandos disponibles:');
  //     this.logger.log('   /start - Inicia el bot');
  //     this.logger.log('   /help - Muestra ayuda');
  //     this.logger.log('   /echo [texto] - Repite el texto');
  //     this.logger.log('========================================');
  //   }
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

  async launch() {
    if (!this.bot) {
      this.logger.error('Bot not initialized - TELEGRAM_TOKEN missing');
      return;
    }

    if (this.isLaunched) {
      this.logger.warn('Bot is already launched');
      return;
    }

    try {
      await this.bot.launch();
      this.isLaunched = true;
      this.logger.log('Bot launched successfully');
    } catch (error) {
      this.logger.error('Error launching bot:', error);
    }
  }

  async stop() {
    if (!this.bot || !this.isLaunched) {
      return;
    }

    try {
      await this.bot.stop('SIGINT');
      this.isLaunched = false;
      this.logger.log('Bot stopped');
    } catch (error) {
      this.logger.warn('Error stopping bot:', error);
    }
  }

  getBot() {
    return this.bot;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) {}

  create(createChatDto: CreateChatDto) {
    return this.chatRepository.save(createChatDto);
  }

  findOneByChatId(chatId: string) {
    return this.chatRepository.findOneBy({ chatId });
  }

  updateChat(chatId: string, updateData: Partial<CreateChatDto>) {
    return this.chatRepository.update({ chatId }, updateData);
  }

  async createOrUpdate(createChatDto: CreateChatDto) {
    const chatId = await this.findOneByChatId(createChatDto.chatId);
    if (chatId) {
      return this.updateChat(createChatDto.chatId, createChatDto);
    }
    return this.create(createChatDto);
  }
}

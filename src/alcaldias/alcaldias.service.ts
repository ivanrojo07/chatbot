import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alcaldia } from './entities/alcaldia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlcaldiasService {
  constructor(
    @InjectRepository(Alcaldia)
    private readonly alcaldiaRepository: Repository<Alcaldia>,
  ) {}

  findAll() {
    return this.alcaldiaRepository.find();
  }
}

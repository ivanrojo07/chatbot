import { Module } from '@nestjs/common';
import { AlcaldiasController } from './alcaldias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alcaldia } from './entities/alcaldia.entity';
import { AlcaldiasService } from './alcaldias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alcaldia])],
  controllers: [AlcaldiasController],
  providers: [AlcaldiasService],
  exports: [AlcaldiasService],
})
export class AlcaldiasModule {}

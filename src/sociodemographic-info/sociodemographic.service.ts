import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SociodemographicInfo } from './entities/sociodemographic-info.entity';
import { Repository } from 'typeorm';
import { CreateSociodemographicInfoDto } from './dto/create-sociodemographic-info.dto';

@Injectable()
export class SociodemographicService {
  constructor(
    @InjectRepository(SociodemographicInfo)
    private readonly sociodemographicInfoRepository: Repository<SociodemographicInfo>,
  ) {}

  create(createSociodemographicInfoDto: CreateSociodemographicInfoDto) {
    return this.sociodemographicInfoRepository.save(
      createSociodemographicInfoDto,
    );
  }
}

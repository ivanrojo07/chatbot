import { Module } from '@nestjs/common';
import { SociodemographicService } from './sociodemographic.service';
import { SociodemographicController } from './sociodemographic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SociodemographicInfo } from './entities/sociodemographic-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SociodemographicInfo])],
  providers: [SociodemographicService],
  controllers: [SociodemographicController],
  exports: [SociodemographicService],
})
export class SociodemographicModule {}

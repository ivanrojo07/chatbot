import { SociodemographicInfo } from 'src/sociodemographic-info/entities/sociodemographic-info.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('alcaldias')
export class Alcaldia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250, unique: true, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  inZone: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => SociodemographicInfo,
    (sociodemographicInfo) => sociodemographicInfo.alcaldia,
  )
  sociodemographic_infos: SociodemographicInfo[];
}

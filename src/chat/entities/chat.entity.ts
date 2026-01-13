import { SociodemographicInfo } from 'src/sociodemographic-info/entities/sociodemographic-info.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryColumn({ length: 250, unique: true, nullable: false })
  chatId: string;

  @Column({ length: 250, nullable: false })
  chatName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(
    () => SociodemographicInfo,
    (sociodemographicInfo) => sociodemographicInfo.chat,
  )
  sociodemographicInfos: SociodemographicInfo;
}

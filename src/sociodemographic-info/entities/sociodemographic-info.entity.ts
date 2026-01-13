import { Alcaldia } from 'src/alcaldias/entities/alcaldia.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Gender } from 'src/common/enums/gender.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SociodemographicInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', nullable: true, enum: Gender })
  gender: Gender;

  // --- RELACIÓN CON ALCALDÍA ---
  @Column() // Esta columna almacena el número
  alcaldiaId: number;
  @ManyToOne(() => Alcaldia, (alcaldia) => alcaldia.sociodemographic_infos)
  @JoinColumn({ name: 'alcaldiaId' }) // Vincula la relación a la columna de arriba
  alcaldia: Alcaldia;

  @Column() // Esta columna almacena el número
  chatId: string;
  @ManyToOne(() => Chat, (chat) => chat.sociodemographicInfos)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}

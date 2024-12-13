import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UpdateServiceDto {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  user_id: number;
}
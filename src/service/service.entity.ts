import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Booking } from 'src/booking/booking.entity';
import { Authentication } from 'src/authentication/authentication.entity';

@Entity('Service')
export class Service {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @ManyToOne(() => Authentication, (authentication) => authentication.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authentication_id' })  // Changed to reference 'Authentication'
  authentication: Authentication;  // Renamed 'user' to 'authentication'


  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @OneToMany(() => Booking, (booking) => booking.service)
bookings: Booking[];
}

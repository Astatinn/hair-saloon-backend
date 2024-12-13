// src/booking/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Authentication } from '../authentication/authentication.entity';
import { Service } from '../service/service.entity';

@Entity('Booking')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => Authentication, (authentication) => authentication.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authentication_id' })  // Changed to reference 'Authentication'
  authentication: Authentication;  // Renamed 'user' to 'authentication'

  @ManyToOne(() => Service, (service) => service.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime' })
  end_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  booking_date: Date;
}

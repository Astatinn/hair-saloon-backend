// src/authentication/authentication.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Booking } from 'src/booking/booking.entity';
import { Service } from 'src/service/service.entity';

@Entity('User')
@Unique(['email'])
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'hairstylist' | 'cashier' | 'customer';

  @Column()
  firebaseUid: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Add relationships to bookings
  @OneToMany(() => Booking, (booking) => booking.authentication)
  bookings: Booking[];

}

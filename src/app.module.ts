// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ServiceModule } from './service/service.module';
import { Service } from './service/service.entity';
import { Booking } from './booking/booking.entity';
import { BookingModule } from './booking/booking.module';
import { Authentication } from './authentication/authentication.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'barber.clygimiicas2.eu-north-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin', // Adjust credentials as needed
      password: 'Barber011', // Adjust password
      database: 'BarberVersion2', // Adjust database name
      entities: [Authentication, Service,Booking], // Include both User and Service entities
      synchronize: true,
    }),
    
    AuthenticationModule,
    ServiceModule,
    BookingModule,
  ],
})
export class AppModule {}

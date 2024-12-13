import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AuthenticationModule } from 'src/authentication/authentication.module';  // Import AuthenticationModule
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    AuthenticationModule,  // Add AuthenticationModule here
    ServiceModule,  // Add ServiceModule here

  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}

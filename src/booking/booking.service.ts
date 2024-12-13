import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/booing.dto';
import { UpdateBookingDto } from './dto/update.booking.dto';
import { Authentication } from 'src/authentication/authentication.entity';
import { Service } from 'src/service/service.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>,  // Correct injection
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Create a new booking
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { user_id } = createBookingDto;  // Assuming you send the 'authentication_id' instead of user_id

    // Check if the user (authentication) exists
    const authentication = await this.authenticationRepository.findOne({ where: { id: user_id } });
    if (!authentication) {
      throw new NotFoundException(`Authentication record with ID ${user_id} not found`);
    }

    // Create booking record
    const booking = this.bookingRepository.create({ ...createBookingDto, authentication });
    return this.bookingRepository.save(booking);
  }

  // Find all bookings
  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  // Update booking
  async updateBooking(
    booking_id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${booking_id} not found`);
    }

    // Update booking details
    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }
}

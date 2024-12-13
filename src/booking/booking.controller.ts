// src/booking/booking.controller.ts
import { Controller, Post, Body, Get, Patch, Param, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/booing.dto';
import { Booking } from './booking.entity';
import { UpdateBookingDto } from './dto/update.booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Endpoint to create a booking
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  // Endpoint to get all bookings
  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  // Update booking
  @Patch(':id')
  async updateBooking(
    @Param('id') booking_id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(booking_id, updateBookingDto);
  }

  // Full update booking
  @Put(':booking_id')
  async updateBookingFull(
    @Param('booking_id') booking_id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(booking_id, updateBookingDto);
  }
}

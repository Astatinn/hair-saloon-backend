// src/booking/dto/booing.dto.ts

export class CreateBookingDto {

  user_id: number;
  authentication_id: number;  // Link to Authentication entity using authentication_id
 
  serviceId: number;  // Link to Service entity using serviceId
  
  appointmentDate: Date;  // Example of booking-related information
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service])], // Register the Service entity
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService,TypeOrmModule],
})
export class ServiceModule {}

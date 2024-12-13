import { Controller, Post, Body, Get, Put, Patch, Param, NotFoundException } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update.service.dto';
import { Service } from './service.entity';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Get(':id')
  async findServiceById(@Param('id') id: number): Promise<Service> {
    const service = await this.serviceService.findById(id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  @Patch(':id')
  async updateService(
    @Param('id') service_id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(service_id, updateServiceDto);
  }

  @Get()
async findAll(): Promise<Service[]> {
  return this.serviceService.findAllServices();
}

  @Put(':id')
  async updateServiceFull(
    @Param('id') service_id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(service_id, updateServiceDto);
  }
}
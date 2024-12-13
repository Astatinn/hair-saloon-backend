import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { UpdateServiceDto } from './dto/update.service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async createService(data: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create(data);
    return this.serviceRepository.save(service);
  }

  async findById(service_id: number): Promise<Service> {
    return this.serviceRepository.findOne({
      where: { service_id },
    });
  }
  async findAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
  

  async updateService(
    service_id: number,
    updateServiceDto: Partial<UpdateServiceDto>,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { service_id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    Object.assign(service, updateServiceDto);

    return this.serviceRepository.save(service);
  }
}
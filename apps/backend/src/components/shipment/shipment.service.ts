import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  // Create a new shipment
  async create(createShipmentInput: CreateShipmentInput): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentInput);
    return await this.shipmentRepository.save(shipment);
  }

  // Get all shipments
  async findAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.find();
  }

  // Get a single shipment by ID
  async findOne(id: UUID): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({ where: { id } });
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  // Update a shipment by ID
  async update(
    id: UUID,
    updateShipmentInput: UpdateShipmentInput,
  ): Promise<Shipment> {
    const shipment = await this.findOne(id);
    if (!shipment) throw new NotFoundException('Shipment not found');
    this.shipmentRepository.merge(shipment, updateShipmentInput);
    return await this.shipmentRepository.save(shipment);
  }

  // Remove a shipment by ID
  async remove(id: UUID): Promise<boolean> {
    const shipment = await this.findOne(id);
    if (!shipment) throw new NotFoundException('Shipment not found');
    const result = await this.shipmentRepository.delete(id);
    return result.affected === 1;
  }

  async trackShipment(shipmentId: string): Promise<string> {
    // Simulate tracking logic
    return `Tracking details for shipment ${shipmentId} retrieved.`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from './airline.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AirlineService {
    constructor(
        @InjectRepository(AirlineEntity)
        private airlineRepository: Repository<AirlineEntity>,
    ) {}

    async findAll(): Promise<AirlineEntity[]> {
        return await this.airlineRepository.find({ relations: ['airports'] });
    }

    async findOne(id: string): Promise<AirlineEntity> {
        const Airline: AirlineEntity = await this.airlineRepository.findOne({where: {id}, relations: ["airports"] } );
        if (!Airline)
          throw new BusinessLogicException("The Airline with the given id was not found", BusinessError.NOT_FOUND);
   
        return Airline;
    }
   
    async create(Airline: AirlineEntity): Promise<AirlineEntity> {
        return await this.airlineRepository.save(Airline);
    }
 
    async update(id: string, Airline: AirlineEntity): Promise<AirlineEntity> {
        const persistedAirline: AirlineEntity = await this.airlineRepository.findOne({where:{id}});
        if (!persistedAirline)
          throw new BusinessLogicException("The Airline with the given id was not found", BusinessError.NOT_FOUND);
       
        Airline.id = id; 
       
        return await this.airlineRepository.save(Airline);
    }
 
    async delete(id: string) {
        const Airline: AirlineEntity = await this.airlineRepository.findOne({where:{id}});
        if (!Airline)
          throw new BusinessLogicException("The Airline with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.airlineRepository.remove(Airline);
    }
 }

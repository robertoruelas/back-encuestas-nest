import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncuestaDto } from './dto/encuesta.dto';
import { EncuestaEntity } from './encuesta.entity';
import { EncuestaRepository } from './encuesta.repository';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class EncuestaService {


    constructor(@InjectRepository(EncuestaEntity)
    private encuestaRepository: EncuestaRepository) { }


    async getAll(): Promise<EncuestaEntity[]> {
        const list = await this.encuestaRepository.find();
        if (!list.length) {
            throw new NotFoundException({message:'La lista está vacia'});
        }
        return list;
    }

    async findById(id: number): Promise<EncuestaEntity> {
        const encuesta = await this.encuestaRepository.findOne(id);
        if (!encuesta) {
            throw new NotFoundException({message:'La encuesta no existe'});
        }
        return encuesta;
    }

    async findByNombre(nombre: string): Promise<EncuestaEntity> {
        const encuesta = await this.encuestaRepository.findOne({ nombre: nombre });
        return encuesta;
    }

    async create(dto: EncuestaDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException( {message:'ese nombre ya existe'});
        const encuesta = this.encuestaRepository.create(dto);
        await this.encuestaRepository.save(encuesta);
        return new MessageDto(`producto ${encuesta.nombre} creado`);
    }

    async update(id: number, dto: EncuestaDto): Promise<any> {
        const encuesta = await this.findById(id);
        if (!encuesta)
            throw new NotFoundException({message: 'no existe'});
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException({message: 'esa encuesta ya existe...'});
        dto.nombre ? encuesta.nombre = dto.nombre : encuesta.nombre = encuesta.nombre;  
        dto.status ? encuesta.status = dto.status : encuesta.status = encuesta.status;     
        await this.encuestaRepository.save(encuesta);
        return {message: `encuesta ${encuesta.nombre} actualizado`}
        //return new MessageDto(`encuesta ${encuesta.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const encuesta = await this.findById(id);
        await this.encuestaRepository.delete(encuesta);
        return {message: `encuesta ${encuesta.nombre} eliminado`};
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post,Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EncuestaDto } from './dto/encuesta.dto';
import { EncuestaService } from './encuesta.service';

@Controller('encuesta')
export class EncuestaController {

    constructor( private readonly encuestaService: EncuestaService) {
        
    }

    @Get()
    async getAll(){
        return await this.encuestaService.getAll();
    }
    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id: number){
         return await this.encuestaService.findById(id);   
    }
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: EncuestaDto){
        return await this.encuestaService.create(dto);
    }
    @Put(':id')
    async update(@Param('id',ParseIntPipe) id: number,@Body() dto: EncuestaDto){
        return await this.encuestaService.update(id,dto);
    }
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return await this.encuestaService.delete(id);
    }

}

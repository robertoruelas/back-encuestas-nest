import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestaEntity } from './encuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EncuestaEntity])],
  providers: [EncuestaService],
  controllers: [EncuestaController]
})
export class EncuestaModule {}

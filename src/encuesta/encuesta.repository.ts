import { EntityRepository, Repository } from "typeorm";
import { EncuestaEntity } from "./encuesta.entity";

@EntityRepository(EncuestaEntity)
export class EncuestaRepository extends Repository<EncuestaEntity>{}

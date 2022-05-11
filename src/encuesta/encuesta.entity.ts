import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'encuesta'})
export class EncuestaEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar',length:100,nullable:false})
    nombre: string;
    @Column({type:'int'})
    status: number;
}
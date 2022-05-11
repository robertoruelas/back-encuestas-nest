import { hash } from "bcryptjs";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type:'varchar',length:20,nullable:true})
    nombre: string;
    @Column({type:'varchar',length:20,nullable:true, unique:true})
    nombreUsuario: string;
    @Column({type:'varchar',length:30,nullable:true, unique:true})
    email: string;
    @Column({type:'varchar',nullable:true})
    password: string;

    @ManyToMany(type => RolEntity, rol => rol.usuarios, {eager:true})
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: {name: 'usuario_id'},
        inverseJoinColumn: {name: 'id_rol'}
    })

    roles: RolEntity[];

    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }
}
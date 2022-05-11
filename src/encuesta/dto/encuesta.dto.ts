import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";


export class EncuestaDto {
    @IsNotBlank({message:'El nombre no puede estar vacío'})
    nombre?: string;
    @IsNumber()
    status?: number;
}
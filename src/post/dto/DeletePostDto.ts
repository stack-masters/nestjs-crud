import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeletePostDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  uuid: string

  @IsString()
  @IsNotEmpty()
  password: string
}
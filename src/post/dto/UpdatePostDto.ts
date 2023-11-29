import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  uuid: string
 
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  password: string
}
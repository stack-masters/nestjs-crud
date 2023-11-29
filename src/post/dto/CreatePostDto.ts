import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreatePostDto {
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
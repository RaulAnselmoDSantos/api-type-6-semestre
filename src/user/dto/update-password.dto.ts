import {IsNotEmpty, IsString, MinLength} from 'class-validator'

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {message: 'A nova senha deve ter no mínimo 6 caracteres'})
  newPassword: string
}
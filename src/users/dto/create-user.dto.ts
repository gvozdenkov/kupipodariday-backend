import { IsString, IsEmail, IsUrl, Length, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(2, 64, { message: `'username' should have minium 2 and maximum 64 characters` })
  username: string;

  @IsOptional()
  @IsString()
  @Length(0, 200, { message: `'about' should have maximum 200 characters` })
  about: string = '';

  @IsOptional()
  @IsUrl({}, { message: `'avatar' should be a valid link to the image` })
  avatar: string = `https://i.pravatar.cc/200/?img=${Math.floor(Math.random() * 70) + 1}`;

  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @Length(4, 64, { message: `'password' shoud be minimum 4 and maximum 64 charecters` })
  password: string;
}

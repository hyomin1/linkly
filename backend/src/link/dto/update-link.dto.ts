import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateLinkDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  title: string;
}

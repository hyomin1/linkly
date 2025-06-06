import { IsUrl, IsInt, IsOptional } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;
}

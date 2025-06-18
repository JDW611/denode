import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export abstract class ListRequest {
    @ApiPropertyOptional({
        description: '페이지 번호',
        default: 1,
        required: false,
        type: Number,
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    readonly page: number = 1;

    @ApiPropertyOptional({
        description: '페이지 당 아이템 수',
        default: 10,
        required: false,
        type: Number,
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    readonly limit: number = 10;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StockMovementType } from '@domain/stock/types/stock-movement.type';
import { LocalDate } from '@js-joda/core';
import { Transform } from 'class-transformer';
import { DateTimeUtil } from '@common/utils/date-time.util';

export class CreateStockMovementRequest {
    @ApiProperty({
        description: '재고 변동 타입',
        enum: StockMovementType,
        example: StockMovementType.IN,
        nullable: true,
        required: false,
    })
    @IsEnum(StockMovementType)
    type: StockMovementType;

    @ApiProperty({
        description: '상품 ID',
        example: 1,
        required: true,
    })
    @IsNumber()
    productId: number;

    @ApiProperty({
        description: '변동 수량',
        example: 100,
        required: true,
    })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: '유통기한 (입고시)',
        nullable: true,
        example: '2025-06-18',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => DateTimeUtil.toLocalDateBy(value))
    expiresAt?: LocalDate;

    @ApiProperty({
        description: '변동 사유',
        example: '신규 입고',
        required: true,
    })
    @IsString()
    reason: string;
}

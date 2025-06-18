import { ListRequest } from '../common/list.request';
import { StockMovementType } from '@domain/stock/types/stock-movement.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindStockHistoriesRequest extends ListRequest {
    @ApiProperty({
        description: '재고 이력 타입',
        enum: StockMovementType,
        required: false,
        example: StockMovementType.IN,
    })
    @IsOptional()
    @IsEnum(StockMovementType)
    type?: StockMovementType;
}

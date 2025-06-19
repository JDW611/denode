import { ApiProperty } from '@nestjs/swagger';
import { Stock } from '@domain/stock/stock.entity';
import { BaseListResponse } from '../common/base-list.response';
import { StockResponse } from './stock.response';

export class StockListResponse extends BaseListResponse<StockResponse> {
    @ApiProperty({
        description: '총 재고 아이템 수',
        example: 2,
    })
    declare readonly count: number;

    @ApiProperty({
        description: '재고 목록',
        example: [
            {
                id: 1,
                product: {
                    id: 1,
                    code: 'PRD001',
                    name: '상품 이름',
                    price: 10000,
                },
                quantity: 100,
                expiresAt: '2024-12-31',
            },
        ],
    })
    declare readonly rows: StockResponse[];

    constructor(count: number, entities: Stock[]) {
        const rows = entities.map(entity => StockResponse.fromEntity(entity));
        super(count, rows);
    }
}

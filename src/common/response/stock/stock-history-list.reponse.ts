import { StockHistory } from '@domain/stock-history/stock-history.entity';
import { BaseListResponse } from '../common/base-list.response';
import { StockHistoryResponse } from './stock-history.reponse';
import { ApiProperty } from '@nestjs/swagger';

export class StockHistoryListResponse extends BaseListResponse<StockHistoryResponse> {
    @ApiProperty({
        description: '총 재고 이력 수',
        example: 2,
    })
    declare readonly count: number;

    @ApiProperty({
        description: '재고 이력 목록',
        example: [
            {
                id: 1,
                stock: {
                    id: 1,
                    product: {
                        id: 1,
                        code: 'PRD001',
                        name: '상품 이름',
                        price: 10000,
                    },
                    expiresAt: '2024-12-31',
                },
                movementType: 'IN',
                previousQuantity: 100,
                quantity: 100,
                currentQuantity: 200,
                reason: '재고 추가',
                createdAt: '2024-01-01T00:00:00.000Z',
            },
        ],
    })
    declare readonly rows: StockHistoryResponse[];

    constructor(count: number, entities: StockHistory[]) {
        const rows = entities.map(entity => StockHistoryResponse.fromEntity(entity));
        super(count, rows);
    }
}

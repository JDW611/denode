import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@core/database/typeorm/generic-typeorm.repository';
import { EntityTarget } from 'typeorm';
import { StockHistory } from './stock-history.entity';
import { IStockHistoryRepository } from './stock-history-repository.interface';
import { StockMovementType } from '../stock/types/stock-movement.type';

@Injectable()
export class StockHistoryRepository
    extends GenericTypeOrmRepository<StockHistory>
    implements IStockHistoryRepository
{
    getName(): EntityTarget<StockHistory> {
        return StockHistory.name;
    }

    async findByUserIdWithPagination(
        userId: number,
        page: number,
        limit: number,
        type?: StockMovementType,
    ): Promise<{ count: number; rows: StockHistory[] }> {
        const whereCondition: any = {
            user: { id: userId },
        };

        if (type) {
            whereCondition.type = type;
        }

        const [histories, total] = await this.getRepository().findAndCount({
            where: whereCondition,
            relations: ['stock', 'stock.product', 'user'],
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { count: total, rows: histories };
    }
}

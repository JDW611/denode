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
        size: number,
        type?: StockMovementType,
    ): Promise<{ count: number; rows: StockHistory[] }> {
        const whereCondition: any = {
            createdBy: { id: userId },
        };

        if (type) {
            whereCondition.type = type;
        }

        const [histories, total] = await this.getRepository().findAndCount({
            where: whereCondition,
            relations: ['stock', 'stock.product', 'createdBy'],
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * size,
            take: size,
        });

        return { count: total, rows: histories };
    }
}

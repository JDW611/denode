import { GenericTypeOrmRepository } from '@core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { EntityTarget, IsNull, MoreThan } from 'typeorm';
import { Stock } from './stock.entity';
import { IStockRepository } from './stock-respository.interface';
import { LocalDate } from '@js-joda/core';

@Injectable()
export class StockRepository extends GenericTypeOrmRepository<Stock> implements IStockRepository {
    getName(): EntityTarget<Stock> {
        return Stock.name;
    }
    async findByUserIdWithPagination(
        userId: number,
        page: number,
        size: number,
    ): Promise<{ count: number; rows: Stock[] }> {
        const [stocks, total] = await this.getRepository().findAndCount({
            where: {
                createdBy: { id: userId },
                quantity: MoreThan(0),
            },
            relations: ['product', 'createdBy'],
            order: {
                product: { code: 'ASC' },
                expiresAt: 'ASC',
                createdAt: 'ASC',
            },
            skip: (page - 1) * size,
            take: size,
        });

        return { count: total, rows: stocks };
    }

    async findByProductIdAndExpiresAt(
        userId: number,
        productId: number,
        expiresAt?: LocalDate,
    ): Promise<Stock | null> {
        return await this.getRepository().findOne({
            where: {
                createdBy: { id: userId },
                product: { id: productId },
                expiresAt: expiresAt ?? IsNull(),
            },
            relations: ['product', 'createdBy'],
        });
    }
}

import { GenericTypeOrmRepository } from '@core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { EntityTarget, MoreThan } from 'typeorm';
import { Stock } from './stock.entity';
import { IStockRepository } from './stock-respository.interface';
import { LocalDate } from '@js-joda/core';

@Injectable()
export class StockRepository extends GenericTypeOrmRepository<Stock> implements IStockRepository {
    getName(): EntityTarget<Stock> {
        return Stock.name;
    }
    async findByUserIdWithPageNation(
        userId: number,
        page: number,
        limit: number,
    ): Promise<{ count: number; rows: Stock[] }> {
        const [stocks, total] = await this.getRepository().findAndCount({
            where: {
                user: { id: userId },
                quantity: MoreThan(0),
            },
            relations: ['product', 'user'],
            order: {
                product: { code: 'ASC' },
                expiresAt: 'ASC',
                createdAt: 'ASC',
            },
            skip: (page - 1) * limit,
            take: limit,
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
                user: { id: userId },
                product: { id: productId },
                expiresAt: expiresAt,
            },
            relations: ['product', 'user'],
        });
    }
}

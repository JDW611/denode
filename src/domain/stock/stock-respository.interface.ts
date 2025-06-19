import { LocalDate } from '@js-joda/core';
import { Stock } from './stock.entity';
import { GenericRepository } from '@core/database/generic/generic.repository';

export const StockRepositoryKey = 'StockRepository';

export interface IStockRepository extends GenericRepository<Stock> {
    findByUserIdWithPagination(
        userId: number,
        page: number,
        size: number,
    ): Promise<{ count: number; rows: Stock[] }>;
    findByProductIdAndExpiresAt(
        userId: number,
        productId: number,
        expiresAt?: LocalDate,
    ): Promise<Stock | null>;
}

import { LocalDate } from '@js-joda/core';
import { Stock } from './stock.entity';
import { GenericRepository } from '@core/database/generic/generic.repository';

export const StockRepositoryKey = 'StockRepository';

export interface IStockRepository extends GenericRepository<Stock> {
    findByUserIdWithPageNation(
        userId: number,
        page: number,
        limit: number,
    ): Promise<{ count: number; rows: Stock[] }>;
    findByProductIdAndExpirationDate(
        userId: number,
        productId: number,
        expirationDate: LocalDate,
    ): Promise<Stock | null>;
}

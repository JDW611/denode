import { StockHistory } from './stock-history.entity';
import { StockMovementType } from '../stock/types/stock-movement.type';
import { GenericRepository } from '@core/database/generic/generic.repository';

export const StockHistoryRepositoryKey = 'StockHistoryRepositoryKey';

export interface IStockHistoryRepository extends GenericRepository<StockHistory> {
    findByUserIdWithPagination(
        userId: number,
        page: number,
        size: number,
        type?: StockMovementType,
    ): Promise<{ count: number; rows: StockHistory[] }>;
}

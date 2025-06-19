import { StockMovementType } from '@domain/stock/types/stock-movement.type';
import { Stock } from '@domain/stock/stock.entity';
import { StockHistory } from '@domain/stock-history/stock-history.entity';
import { LocalDate } from '@js-joda/core';

export const StockServiceKey = 'StockServiceKey';

export interface IStockService {
    findStocks(
        userId: number,
        page: number,
        size: number,
    ): Promise<{ count: number; rows: Stock[] }>;
    findStockHistories(
        userId: number,
        page: number,
        size: number,
        type?: StockMovementType,
    ): Promise<{ count: number; rows: StockHistory[] }>;
    createStockMovement(
        userId: number,
        type: StockMovementType,
        productId: number,
        quantity: number,
        expiresAt?: LocalDate,
        reason?: string,
    ): Promise<void>;
}

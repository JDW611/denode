import { StockHistory } from '@domain/stock-history/stock-history.entity';
import { StockMovementType } from '@domain/stock/types/stock-movement.type';
import { LocalDate } from '@js-joda/core';

export class StockHistoryResponse {
    readonly id: number;

    readonly stock: {
        id: number;
        product: {
            id: number;
            code: string;
            name: string;
            price: number;
        };
        expirationDate: LocalDate;
    };
    readonly movementType: StockMovementType;

    readonly quantity: number;

    readonly previousQuantity: number;

    readonly currentQuantity: number;

    readonly reason: string;

    constructor(data: {
        id: number;
        stock: {
            id: number;
            product: {
                id: number;
                code: string;
                name: string;
                price: number;
            };
            expirationDate: LocalDate;
        };
        movementType: StockMovementType;
        quantity: number;
        previousQuantity: number;
        currentQuantity: number;
        reason: string;
    }) {
        this.id = data.id;
        this.stock = data.stock;
        this.movementType = data.movementType;
        this.quantity = data.quantity;
        this.previousQuantity = data.previousQuantity;
        this.currentQuantity = data.currentQuantity;
        this.reason = data.reason;
    }

    static fromEntity(stockHistory: StockHistory): StockHistoryResponse {
        return new StockHistoryResponse({
            id: stockHistory.id,
            stock: {
                id: stockHistory.stock.id,
                product: {
                    id: stockHistory.stock.product.id,
                    code: stockHistory.stock.product.code,
                    name: stockHistory.stock.product.name,
                    price: stockHistory.stock.product.price,
                },
                expirationDate: stockHistory.stock.expirationDate,
            },
            movementType: stockHistory.type,
            quantity: stockHistory.quantity,
            previousQuantity: stockHistory.previousQuantity,
            currentQuantity: stockHistory.currentQuantity,
            reason: stockHistory.reason,
        });
    }
}

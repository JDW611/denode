import { LocalDate } from '@js-joda/core';
import { Stock } from '@domain/stock/stock.entity';

export class StockResponse {
    readonly id: number;

    readonly product: {
        id: number;
        code: string;
        name: string;
        price: number;
    };

    readonly quantity: number;

    readonly expirationDate?: LocalDate;

    constructor(data: {
        id: number;
        product: {
            id: number;
            code: string;
            name: string;
            price: number;
        };
        quantity: number;
        expirationDate?: LocalDate;
    }) {
        this.id = data.id;
        this.product = data.product;
        this.quantity = data.quantity;
        this.expirationDate = data.expirationDate;
    }

    static fromEntity(stock: Stock): StockResponse {
        return new StockResponse({
            id: stock.id,
            product: {
                id: stock.product.id,
                code: stock.product.code,
                name: stock.product.name,
                price: stock.product.price,
            },
            quantity: stock.quantity,
            expirationDate: stock.expirationDate,
        });
    }
}

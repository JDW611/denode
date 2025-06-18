import { Inject, Injectable } from '@nestjs/common';
import { IStockService } from '../interfaces/stock-service.interface';
import { StockRepositoryKey } from '@domain/stock/stock-respository.interface';
import { IStockRepository } from '@domain/stock/stock-respository.interface';
import { StockHistoryRepositoryKey } from '@domain/stock-history/stock-history-repository.interface';
import { IStockHistoryRepository } from '@domain/stock-history/stock-history-repository.interface';
import { Stock } from '@domain/stock/stock.entity';
import { StockMovementType } from '@domain/stock/types/stock-movement.type';
import { StockHistory } from '@domain/stock-history/stock-history.entity';
import { ProductRepositoryKey } from '@domain/product/product-repository.interface';
import { IProductRepository } from '@domain/product/product-repository.interface';
import { UserRepositoryKey } from '@domain/user/user-repository.interface';
import { IUserRepository } from '@domain/user/user-repository.interface';
import { BadRequestException, NotFoundException } from '@core/exceptions/service.exception';
import { Transactional } from '@nestjs-cls/transactional';
import { LocalDate } from '@js-joda/core';

@Injectable()
export class StockService implements IStockService {
    constructor(
        @Inject(StockRepositoryKey)
        private readonly stockRepository: IStockRepository,
        @Inject(StockHistoryRepositoryKey)
        private readonly stockHistoryRepository: IStockHistoryRepository,
        @Inject(ProductRepositoryKey)
        private readonly productRepository: IProductRepository,
        @Inject(UserRepositoryKey)
        private readonly userRepository: IUserRepository,
    ) {}

    async findStocks(
        userId: number,
        page: number,
        limit: number,
    ): Promise<{ count: number; rows: Stock[] }> {
        return await this.stockRepository.findByUserIdWithPageNation(userId, page, limit);
    }

    async findStockHistories(
        userId: number,
        page: number,
        limit: number,
        type?: StockMovementType,
    ): Promise<{ count: number; rows: StockHistory[] }> {
        return await this.stockHistoryRepository.findByUserIdWithPagination(
            userId,
            page,
            limit,
            type,
        );
    }

    @Transactional()
    async createStockMovement(
        userId: number,
        type: StockMovementType,
        productId: number,
        quantity: number,
        expirationDate?: LocalDate,
        reason?: string,
    ): Promise<void> {
        const [user, product] = await Promise.all([
            this.userRepository.findById(userId),
            this.productRepository.findById(productId),
        ]);

        if (!user) {
            throw NotFoundException('User not found');
        }

        if (!product) {
            throw NotFoundException('Product not found');
        }

        const existingStock = await this.stockRepository.findByProductIdAndExpirationDate(
            userId,
            productId,
            expirationDate,
        );

        let stock: Stock;

        if (existingStock) {
            stock = existingStock;
        } else {
            stock = Stock.of(user, product, 0, expirationDate);
        }

        const previousQuantity = stock.quantity;

        if (type === StockMovementType.IN) {
            stock.addQuantity(quantity);
        } else {
            if (!stock.canReduceQuantity(quantity)) {
                throw BadRequestException('stock is not enough');
            }
            stock.reduceQuantity(quantity);
        }

        await this.stockRepository.save(stock);

        const history = StockHistory.of(
            stock,
            user,
            type,
            quantity,
            previousQuantity,
            stock.quantity,
            reason,
        );

        await this.stockHistoryRepository.save(history);
    }
}

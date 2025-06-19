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
import { NotFoundException } from '@core/exceptions/service.exception';
import { Propagation, Transactional } from '@nestjs-cls/transactional';
import { LocalDate } from '@js-joda/core';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';

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
        return await this.stockRepository.findByUserIdWithPagination(userId, page, limit);
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

    @Transactional<TransactionalAdapterTypeOrm>(Propagation.Required, {
        isolationLevel: 'SERIALIZABLE',
    })
    async createStockMovement(
        userId: number,
        type: StockMovementType,
        productId: number,
        quantity: number,
        expiresAt?: LocalDate,
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

        const existingStock = await this.stockRepository.findByProductIdAndExpiresAt(
            userId,
            productId,
            expiresAt,
        );

        let stock = existingStock || Stock.of(user, product, 0, expiresAt);

        if (!existingStock && type === StockMovementType.OUT) {
            throw NotFoundException('stock is not found');
        }

        const previousQuantity = stock.quantity;

        if (type === StockMovementType.IN) {
            stock.receive(quantity);
        } else {
            stock.dispense(quantity);
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

import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { LocalDateTransformer } from '@core/database/typeorm/transformer';
import { Product } from '@domain/product/product.entity';
import { User } from '@domain/user/user.entity';
import { LocalDate } from '@js-joda/core';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'stocks' })
export class Stock extends BaseTimeEntity {
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'int', nullable: false, default: 0 })
    quantity: number;

    @Column({
        type: 'date',
        nullable: true,
        transformer: new LocalDateTransformer(),
    })
    expiresAt?: LocalDate;

    static of(user: User, product: Product, quantity: number, expiresAt?: LocalDate): Stock {
        const stock = new Stock();
        stock.user = user;
        stock.product = product;
        stock.quantity = quantity;
        stock.expiresAt = expiresAt;
        return stock;
    }

    addQuantity(quantity: number): void {
        this.quantity += quantity;
    }

    reduceQuantity(quantity: number): void {
        this.quantity -= quantity;
    }

    canReduceQuantity(quantity: number): boolean {
        return this.quantity >= quantity;
    }

    isExpired(): boolean {
        return this.expiresAt && this.expiresAt.isBefore(LocalDate.now());
    }
}

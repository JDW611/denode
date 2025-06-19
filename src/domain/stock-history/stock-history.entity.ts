import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { Stock } from '@domain/stock/stock.entity';
import { User } from '@domain/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StockMovementType } from '../stock/types/stock-movement.type';

@Entity({ name: 'stock_histories' })
export class StockHistory extends BaseTimeEntity {
    @ManyToOne(() => Stock, { nullable: false })
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @Column({
        type: 'enum',
        nullable: false,
        enum: StockMovementType,
    })
    type: StockMovementType;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @Column({ type: 'int', nullable: false })
    previousQuantity: number;

    @Column({ type: 'int', nullable: false })
    currentQuantity: number;

    @Column({ type: 'varchar', nullable: false })
    reason: string;

    static of(
        stock: Stock,
        createdBy: User,
        type: StockMovementType,
        quantity: number,
        previousQuantity: number,
        currentQuantity: number,
        reason: string,
    ): StockHistory {
        const history = new StockHistory();
        history.stock = stock;
        history.createdBy = createdBy;
        history.type = type;
        history.quantity = quantity;
        history.previousQuantity = previousQuantity;
        history.currentQuantity = currentQuantity;
        history.reason = reason;
        return history;
    }
}

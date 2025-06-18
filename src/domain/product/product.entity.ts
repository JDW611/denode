import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseTimeEntity {
    @Column({ type: 'varchar', unique: true, nullable: false })
    code: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', nullable: true })
    category?: string;

    static create(
        code: string,
        name: string,
        price: number,
        description?: string,
        category?: string,
    ): Product {
        const product = new Product();
        product.code = code;
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;

        return product;
    }
}

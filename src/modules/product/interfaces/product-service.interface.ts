import { Product } from '@domain/product/product.entity';

export const ProductServiceKey = 'ProductServiceKey';

export interface IProductService {
    create(userId: number, product: Product): Promise<void>;
}

import { GenericRepository } from '@core/database/generic/generic.repository';
import { Product } from './product.entity';

export const ProductRepositoryKey = 'ProductRepositoryKey';

export interface IProductRepository extends GenericRepository<Product> {
    findOneByCode(code: string): Promise<Product | null>;
}

import { ClassProvider, Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductRepositoryKey } from './product-repository.interface';

export const productRepository: ClassProvider = {
    provide: ProductRepositoryKey,
    useClass: ProductRepository,
};

@Module({
    providers: [productRepository],
    exports: [productRepository],
})
export class ProductRepositoryModule {}

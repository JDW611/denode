import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product-service.interface';

import {
    IProductRepository,
    ProductRepositoryKey,
} from '@domain/product/product-repository.interface';
import { Product } from '@domain/product/product.entity';
import { ConflictException } from '@core/exceptions/service.exception';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @Inject(ProductRepositoryKey) private readonly productRepository: IProductRepository,
    ) {}

    @Transactional()
    async create(product: Product): Promise<void> {
        const existingProduct = await this.productRepository.findOneByCode(product.code);

        if (existingProduct) {
            throw ConflictException('Product already exists');
        }

        await this.productRepository.save(product);
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product-service.interface';

import {
    IProductRepository,
    ProductRepositoryKey,
} from '@domain/product/product-repository.interface';
import { Product } from '@domain/product/product.entity';
import { ConflictException, NotFoundException } from '@core/exceptions/service.exception';
import { Transactional } from '@nestjs-cls/transactional';
import { UserRepositoryKey } from '@domain/user/user-repository.interface';
import { IUserRepository } from '@domain/user/user-repository.interface';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @Inject(ProductRepositoryKey) private readonly productRepository: IProductRepository,
        @Inject(UserRepositoryKey) private readonly userRepository: IUserRepository,
    ) {}

    @Transactional()
    async create(userId: number, product: Product): Promise<void> {
        const existingProduct = await this.productRepository.findOneByCode(product.code);

        if (existingProduct) {
            throw ConflictException('Product already exists');
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw NotFoundException('User not found');
        }

        product.user = user;

        await this.productRepository.save(product);
    }
}

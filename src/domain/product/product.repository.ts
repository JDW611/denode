import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@core/database/typeorm/generic-typeorm.repository';
import { EntityTarget } from 'typeorm';
import { Product } from './product.entity';
import { IProductRepository } from './product-repository.interface';

@Injectable()
export class ProductRepository
    extends GenericTypeOrmRepository<Product>
    implements IProductRepository
{
    getName(): EntityTarget<Product> {
        return Product.name;
    }

    async findOneByCode(code: string): Promise<Product | null> {
        return await this.getRepository().findOneBy({ code });
    }
}

import { ClassProvider, Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductServiceKey } from './interfaces/product-service.interface';
import { ProductRepositoryModule } from '@domain/product/product-repository.module';
import { UserRepositoryModule } from '@domain/user/user-repository.module';

const productService: ClassProvider = {
    provide: ProductServiceKey,
    useClass: ProductService,
};

@Module({
    imports: [ProductRepositoryModule, UserRepositoryModule],
    controllers: [ProductController],
    providers: [productService],
})
export class ProductModule {}

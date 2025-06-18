import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IProductService, ProductServiceKey } from '../interfaces/product-service.interface';
import { CreateProductRequest } from '@common/request/product/create-product.request';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';

@ApiTags('Product API')
@Controller('products')
export class ProductController {
    constructor(@Inject(ProductServiceKey) private readonly productService: IProductService) {}

    @ApiBearerAuth()
    @ApiOkResponseEntity(null, HttpStatus.CREATED, '제품 등록 성공')
    @ApiOperation({ summary: '제품 등록' })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() dto: CreateProductRequest): Promise<void> {
        return await this.productService.create(dto.toEntity());
    }
}

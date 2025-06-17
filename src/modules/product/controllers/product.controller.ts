import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IProductService, ProductServiceKey } from '../interfaces/product-service.interface';
import { CreateProductRequest } from '@common/request/product/create-product.request';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(@Inject(ProductServiceKey) private readonly productService: IProductService) {}

    @ApiBearerAuth()
    @ApiOkResponseEntity(null, HttpStatus.CREATED, '상품 생성 성공')
    @ApiOperation({ summary: '상품 생성' })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() dto: CreateProductRequest): Promise<void> {
        return await this.productService.create(dto.toEntity());
    }
}

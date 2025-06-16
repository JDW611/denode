import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';

@Controller('health')
@ApiTags('Health Check API')
export class HealthController {
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Health Check API', description: '서비스 상태를 확인합니다.' })
    @ApiOkResponseEntity()
    healthCheck(): void {}
}

import { Controller, Get, Headers, Inject } from '@nestjs/common';
import { AuthServiceKey, IAuthService } from '../interfaces/auth-service.interface';
import { BadRequestException } from '@core/exceptions/service.exception';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthServiceKey) private readonly service: IAuthService) {}

    @Get('token/validate')
    isValid(@Headers('Authorization') header: string) {
        const headerArray = header.split(' ');
        if (headerArray.length != 2)
            throw BadRequestException('Invalid authorization token format');
        const [_, token] = headerArray;

        return this.service.isValidated(token);
    }
}

import { DenodeUser } from '@common/dto/context/denode-user.dto';
import { UnauthorizedException } from '@core/exceptions/service.exception';
import { ITokenService, TokenServiceKey } from '@core/token/interfaces/token-service.interface';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(@Inject(TokenServiceKey) private readonly tokenService: ITokenService) {}

    private readonly WHITELIST = [
        '/auth/login',
        '/auth/logout',
        '/auth/refresh',
        '/auth/signup',
        '/health',
    ];

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const result = this.WHITELIST.find(path => request.path.includes(path));
        if (result) return true;

        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader || authorizationHeader === '') {
            throw UnauthorizedException('인증정보가 없습니다.');
        }

        const headerArray = authorizationHeader.split(' ');
        if (headerArray.length != 2) {
            throw UnauthorizedException('인증정보가 형식이 옳바르지 않습니다.');
        }

        try {
            const [_, token] = headerArray;
            const accessClaim = this.tokenService.verifiedToken(token);

            const denodeUser = new DenodeUser(accessClaim.id, accessClaim.userId);

            Object.assign(request, { denodeUser });
            return true;
        } catch (e) {
            throw UnauthorizedException(e.message);
        }
    }
}

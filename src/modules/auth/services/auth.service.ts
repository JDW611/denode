import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-service.interface';
import { ITokenService, TokenServiceKey } from '@core/token/interfaces/token-service.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(TokenServiceKey) private readonly tokenService: ITokenService) {}

    isValidated(token: string): boolean {
        try {
            if (!token || token === '') {
                return false;
            }

            return !!this.tokenService.verifiedToken(token);
        } catch (e) {
            return false;
        }
    }
}

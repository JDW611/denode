import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-service.interface';
import { ITokenService, TokenServiceKey } from '@core/token/interfaces/token-service.interface';
import { UserRepositoryKey, IUserRepository } from '@domain/user/user-repository.interface';
import { BadRequestException } from '@core/exceptions/service.exception';
import { User } from '@domain/user/user.entity';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(TokenServiceKey) private readonly tokenService: ITokenService,
        @Inject(UserRepositoryKey) private readonly userRepository: IUserRepository,
    ) {}

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

    async signup(registerUser: User): Promise<string[]> {
        const user = await this.userRepository.findOneByUsername(registerUser.username);
        if (user) {
            throw BadRequestException('User already exists');
        }

        const newUser = await this.userRepository.save(registerUser);

        return this.tokenService.createToken(newUser);
    }
}

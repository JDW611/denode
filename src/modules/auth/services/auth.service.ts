import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-service.interface';
import { ITokenService, TokenServiceKey } from '@core/token/interfaces/token-service.interface';
import { UserRepositoryKey, IUserRepository } from '@domain/user/user-repository.interface';
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@core/exceptions/service.exception';
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

    async login(username: string, password: string): Promise<string[]> {
        const user = await this.userRepository.findOneByUsername(username);
        if (!user) {
            throw NotFoundException('User not found');
        }

        if (!user.isValidPassword(password)) {
            throw UnauthorizedException('Invalid password');
        }

        return this.tokenService.createToken(user);
    }

    async logout(accessToken: string): Promise<void> {
        await this.tokenService.removeToken(accessToken);
    }

    async refresh(accessToken: string, refreshToken: string): Promise<string[]> {
        return this.tokenService.refresh(accessToken, refreshToken);
    }
}

import { User } from '@domain/user/user.entity';

export const AuthServiceKey = 'AuthServiceKey';

export interface IAuthService {
    isValidated(accessToken: string): boolean;
    signup(registerUser: User): Promise<string[]>;
    login(username: string, password: string): Promise<string[]>;
    logout(accessToken: string): Promise<void>;
    refresh(accessToken: string, refreshToken: string): Promise<string[]>;
}

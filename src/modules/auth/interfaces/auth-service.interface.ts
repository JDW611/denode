import { User } from '@domain/user/user.entity';

export const AuthServiceKey = 'AuthServiceKey';

export interface IAuthService {
    isValidated(accessToken: string): boolean;
    signup(registerUser: User): Promise<string[]>;
}

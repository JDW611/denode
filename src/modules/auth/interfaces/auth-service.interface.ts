export const AuthServiceKey = 'AuthServiceKey';

export interface IAuthService {
    isValidated(accessToken: string): boolean;
    register(username: string, password: string): Promise<string[]>;
    login(username: string, password: string): Promise<string[]>;
    logout(accessToken: string): Promise<void>;
    refresh(accessToken: string, refreshToken: string): Promise<string[]>;
}

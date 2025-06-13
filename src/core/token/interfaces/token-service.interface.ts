import { AccessTokenClaimDto } from '@common/dto/token/access-token-claim.dto';
import { User } from 'src/domain/user/user.entity';

export const TokenServiceKey = 'TokenServiceKey';

export interface ITokenService {
    createToken(user: User): Promise<string[]>;
    verifiedToken(token: string): AccessTokenClaimDto;
    refresh(accessToken: string, refreshToken: string): Promise<string[]>;
    removeToken(accessToken: string): Promise<void>;
}

import { Expose } from 'class-transformer';

export class AccessTokenClaimDto {
    @Expose()
    readonly id: string;

    @Expose()
    readonly userId: number;

    @Expose()
    readonly username: string;

    @Expose()
    readonly iat: number;

    @Expose()
    readonly exp: number;

    @Expose()
    readonly iss: string;
}

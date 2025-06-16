import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
    @ApiProperty({
        description: 'JWT 엑세스 토큰',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE4MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        type: String,
    })
    readonly accessToken: string;

    @ApiProperty({
        description: '리프레시 토큰(엑세스 토큰 갱신용)',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE4MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        type: String,
    })
    readonly refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

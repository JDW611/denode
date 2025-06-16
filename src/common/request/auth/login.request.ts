import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
    @ApiProperty({
        description: '유저 아이디',
        example: 'test',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({
        description: '유저 비밀번호',
        example: 'password',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

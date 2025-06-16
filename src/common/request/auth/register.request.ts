import { IsString, IsNotEmpty } from 'class-validator';
import { hashSync } from 'bcrypt';
import { User } from '@domain/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
    @ApiProperty({
        description: '유저 아이디',
        example: 'admin',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: '유저 비밀번호',
        example: 'password',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    constructor() {}

    static of(username: string, password: string): RegisterRequest {
        const dto = new RegisterRequest();
        dto.username = username;
        dto.password = hashSync(password, 10);

        return dto;
    }

    toEntity(): User {
        return User.signup(this.username, this.password);
    }
}

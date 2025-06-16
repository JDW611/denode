import { ApiProperty } from '@nestjs/swagger';

export class ValidationResponse {
    @ApiProperty({
        description: '유효성 검사 결과',
        example: true,
        type: Boolean,
    })
    readonly isValid: boolean;

    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
}

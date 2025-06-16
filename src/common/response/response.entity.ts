import { Exclude } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseEntity<T> {
    @Exclude() public readonly isSuccess: boolean;
    @Exclude() public readonly exception?: any;
    @Exclude() private readonly _data?: T;

    @ApiProperty({
        description: 'HTTP 상태 코드',
        example: 200,
        type: Number,
    })
    code: number;

    @ApiProperty({
        description: '응답 메시지',
        example: 'OK',
        type: String,
    })
    message: string;

    @ApiProperty({
        description: '응답 데이터',
        required: false,
        nullable: true,
    })
    result?: T;

    private constructor(isSuccess: boolean, exception?: any, data?: T) {
        if (isSuccess && exception) {
            throw new Error(`InvalidOperation: A result cannot be successful and contain an error`);
        }
        if (!isSuccess && !exception) {
            throw new Error(`InvalidOperation: A failing result needs to contain an error message`);
        }

        this.isSuccess = isSuccess;
        this.exception = exception;
        this._data = data;

        Object.freeze(this);
    }

    get data(): T | undefined {
        return this._data;
    }

    static ok<T>(data?: T): ResponseEntity<T> {
        return new ResponseEntity<T>(true, null, data);
    }

    static fail<T>(exception: any): ResponseEntity<T> {
        return new ResponseEntity<T>(false, exception);
    }

    get json(): any {
        const exception = this.exception;
        const showDetail = process.env.NODE_ENV !== 'prod';

        if (showDetail && this.exception && !this.isSuccess) {
            const detail = exception?.detail;
            this.exception.detail = {
                ...detail,
                ...{
                    location:
                        exception?.__file__ &&
                        `${exception?.__file__}:${exception?.__line__} (${exception?.__function__})`,
                },
            };
        }

        return this.isSuccess
            ? {
                  code: HttpStatus.OK,
                  message: 'OK',
                  result: this._data,
              }
            : {
                  code: this.exception?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                  message: exception?.message,
                  detail: showDetail ? exception?.detail : undefined,
              };
    }

    public toJSON(): any {
        return this.json;
    }
}

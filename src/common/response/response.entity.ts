import { Exclude } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseEntity<T> {
    @Exclude() public readonly isSuccess: boolean;
    @Exclude() public readonly exception?: any;
    @Exclude() private readonly _data?: T;
    @Exclude() private readonly statusCode: number;
    @Exclude() private readonly statusMessage?: string;

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

    private constructor(
        statusCode: number,
        isSuccess: boolean,
        exception?: any,
        data?: T,
        statusMessage?: string,
    ) {
        if (isSuccess && exception) {
            throw new Error(`InvalidOperation: A result cannot be successful and contain an error`);
        }
        if (!isSuccess && !exception) {
            throw new Error(`InvalidOperation: A failing result needs to contain an error message`);
        }

        this.statusCode = statusCode;
        this.isSuccess = isSuccess;
        this.exception = exception;
        this._data = data;
        this.statusMessage = statusMessage;

        Object.freeze(this);
    }

    get data(): T | undefined {
        return this._data;
    }

    static ok<T>(data?: T): ResponseEntity<T>;
    static ok<T>(data: T, statusCode: number, message?: string): ResponseEntity<T>;
    static ok<T>(data?: T, statusCode?: number, message?: string): ResponseEntity<T> {
        const code = statusCode || HttpStatus.OK;
        return new ResponseEntity<T>(code, true, null, data, message);
    }

    static fail<T>(exception: any): ResponseEntity<T> {
        const statusCode = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<T>(statusCode, false, exception);
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
                  code: this.statusCode,
                  message: this.statusMessage || this.getDefaultMessage(this.statusCode),
                  ...(this.statusCode !== HttpStatus.NO_CONTENT && { result: this._data }),
              }
            : {
                  code: this.statusCode,
                  message: exception?.message,
                  detail: showDetail ? exception?.detail : undefined,
              };
    }

    private getDefaultMessage(statusCode: number): string {
        switch (statusCode) {
            case HttpStatus.OK:
                return 'OK';
            case HttpStatus.CREATED:
                return 'Created';
            case HttpStatus.ACCEPTED:
                return 'Accepted';
            case HttpStatus.NO_CONTENT:
                return 'No Content';
            case HttpStatus.PARTIAL_CONTENT:
                return 'Partial Content';
            default:
                return 'Success';
        }
    }

    public toJSON(): any {
        return this.json;
    }
}

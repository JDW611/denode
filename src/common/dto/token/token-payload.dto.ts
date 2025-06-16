export class TokenPayloadDto {
    readonly id: string;
    readonly userId: number;
    readonly username: string;

    constructor(id: string, userId: number, username: string) {
        this.id = id;
        this.userId = userId;
        this.username = username;
    }

    toPlain(): { id: string; userId: number; username: string } {
        return {
            id: this.id,
            userId: this.userId,
            username: this.username,
        };
    }
}

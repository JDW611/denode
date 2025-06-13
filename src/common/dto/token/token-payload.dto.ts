export class TokenPayloadDto {
    readonly id: string;
    readonly userId: number;
    readonly name: string;

    constructor(id: string, userId: number, name: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
    }

    toPlain(): { id: string; userId: number; name: string } {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
        };
    }
}

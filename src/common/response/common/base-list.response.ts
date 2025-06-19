export abstract class BaseListResponse<T> {
    declare readonly count: number;

    declare readonly rows: T[];

    constructor(count: number, rows: T[]) {
        this.count = count;
        this.rows = rows;
    }
}

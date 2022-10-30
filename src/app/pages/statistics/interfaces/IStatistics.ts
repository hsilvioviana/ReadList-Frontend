import { IBook } from "./IBook";

export interface IStatistics {
    key: string,
    count: string,
    books: IBook[],
}

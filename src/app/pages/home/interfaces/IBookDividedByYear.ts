export interface IBookDividedByYear {
    key: string,
    count: number,
    books: IBook[]
}

export interface IBook {
    id: string,
    title: string,
    author: string,
    releaseYear: number,
    readingYear: number,
    isFiction: boolean,
    genres: string[],
    numberOfPages: number,
    countryofOrigin: string,
    language: string
}

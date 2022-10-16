export interface IBookCreate {
    title: string,
    author: string,
    releaseYear: number,
    readingYear: number,
    isFiction: boolean,
    genrers: string[],
    numberOfPages: number,
    countryofOrigin: string,
    language: string
}

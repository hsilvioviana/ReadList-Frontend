export interface IBookEdit {
    id: string
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

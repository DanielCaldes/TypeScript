import { ValidationUtils } from '../utils/ValidationUtils';
import {validate} from '../decorators/validate';

export class Book {
    constructor(
        private _isbn: string,
        private _title: string, 
        private _author: string, 
        private _year: number, 
        private _genre: string, 
        private _copies: number
    ) {}

    // Getter y Setter para 'isbn'
    public get isbn(): string{
        return this._isbn;
    }
    @validate(ValidationUtils.validateNotEmptyString,"Book isbn")
    public set isbn(newIsbn: string) {
        this._isbn = newIsbn;
    }

    // Getter y Setter para 'title'
    public get title(): string {
        return this._title;
    }
    @validate(ValidationUtils.validateNotEmptyString,"Book title")
    public set title(newTitle: string) {
        this._title = newTitle;
    }

    // Getter y Setter para 'author'
    public get author(): string {
        return this._author;
    }
    @validate(ValidationUtils.validateNotEmptyString, "Book author")
    public set author(newAuthor: string) {
        this._author = newAuthor;
    }

    // Getter y Setter para 'year'
    public get year(): number {
        return this._year;
    }
    @validate(ValidationUtils.validateNotNegativeNumber, "Book year")
    public set year(newYear: number) {
        this._year = newYear;
    }

    // Getter y Setter para 'genre'
    public get genre(): string {
        return this._genre;
    }
    @validate(ValidationUtils.validateNotEmptyString, "Book genre")
    public set genre(newGenre: string) {
        this._genre = newGenre;
    }

    // Getter y Setter para 'copies'
    public get copies(): number {
        return this._copies;
    }
    @validate(ValidationUtils.validateNotNegativeNumber,"Book copies")
    public set copies(newCopies: number) {
        this._copies = newCopies;
    }

    // Método para prestar un libro si hay copias disponibles
    public borrowBook():boolean{
        if(this._copies > 0){
            this._copies--;
            return true;
        }
        return false;
    }

    //Método para devolver un libro
    public returnBook():void{
        this._copies++;
    }
}
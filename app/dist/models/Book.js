"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const ValidationUtils_1 = require("../utils/ValidationUtils");
const validate_1 = require("../decorators/validate");
class Book {
    constructor(_isbn, _title, _author, _year, _genre, _copies) {
        this._isbn = _isbn;
        this._title = _title;
        this._author = _author;
        this._year = _year;
        this._genre = _genre;
        this._copies = _copies;
    }
    // Getter y Setter para 'isbn'
    get isbn() {
        return this._isbn;
    }
    set isbn(newIsbn) {
        this._isbn = newIsbn;
    }
    // Getter y Setter para 'title'
    get title() {
        return this._title;
    }
    set title(newTitle) {
        this._title = newTitle;
    }
    // Getter y Setter para 'author'
    get author() {
        return this._author;
    }
    set author(newAuthor) {
        this._author = newAuthor;
    }
    // Getter y Setter para 'year'
    get year() {
        return this._year;
    }
    set year(newYear) {
        this._year = newYear;
    }
    // Getter y Setter para 'genre'
    get genre() {
        return this._genre;
    }
    set genre(newGenre) {
        this._genre = newGenre;
    }
    // Getter y Setter para 'copies'
    get copies() {
        return this._copies;
    }
    set copies(newCopies) {
        this._copies = newCopies;
    }
    // Método para prestar un libro si hay copias disponibles
    borrowBook() {
        if (this._copies > 0) {
            this._copies--;
            return true;
        }
        return false;
    }
    //Método para devolver un libro
    returnBook() {
        this._copies++;
    }
}
exports.Book = Book;
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotEmptyString, "Book isbn"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Book.prototype, "isbn", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotEmptyString, "Book title"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Book.prototype, "title", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotEmptyString, "Book author"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Book.prototype, "author", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotNegativeNumber, "Book year"),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Book.prototype, "year", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotEmptyString, "Book genre"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Book.prototype, "genre", null);
__decorate([
    (0, validate_1.validate)(ValidationUtils_1.ValidationUtils.validateNotNegativeNumber, "Book copies"),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Book.prototype, "copies", null);

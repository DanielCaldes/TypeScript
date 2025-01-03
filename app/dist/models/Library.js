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
exports.Library = void 0;
const Book_1 = require("./Book");
const User_1 = require("./User");
const Loan_1 = require("./Loan");
const logTraceToFile_1 = require("../decorators/logTraceToFile");
const logErrorToFile_1 = require("../decorators/logErrorToFile");
class Library {
    constructor() {
        this._books = new Map();
        this._users = new Map();
        this._loans = [];
    }
    /******************
    BOOKS SECTION
    *******************/
    addBook(book) {
        if (this._books.has(book.isbn)) {
            console.warn(`[AddBook] El libro (${book.title}:${book.isbn}) ya existe en la librería.`);
            throw new Error(`[AddBook] El libro (${book.title}:${book.isbn}) ya existe en la librería.`);
        }
        else {
            this._books.set(book.isbn, book);
            console.log(`[AddBook] El libro (${book.title}:${book.isbn}) ha sido añadido!`);
        }
    }
    updateBook(isbn, book) {
        if (!this._books.has(isbn)) {
            console.warn(`[UpdateBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
            throw new Error(`[UpdateBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
        }
        else {
            this._books.delete(isbn);
            this._books.set(book.isbn, book);
            console.log(`[UpdateBook] Datos actualizados del libro (${book.title}:${book.isbn})!`);
        }
    }
    removeBook(isbn) {
        if (!this._books.has(isbn)) {
            console.warn(`[RemoveBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
            throw new Error(`[RemoveBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
        }
        else {
            this._books.delete(isbn);
            console.log(`[RemoveBook] Libro con isbn (${isbn}) borrado!`);
        }
    }
    get booksList() {
        if (this._books.size === 0) {
            return "No hay libros disponibles en la librería.";
        }
        let books = [];
        this._books.forEach((book) => {
            books.push(`Título: ${book.title}\n` +
                `Autor: ${book.author}\n` +
                `Año de publicación: ${book.year}\n` +
                `Género: ${book.genre}\n` +
                `Copias disponibles: ${book.copies}\n`);
        });
        return books.join("\n");
    }
    /******************
    USERS SECTION
    *******************/
    registerUser(user) {
        if (this._users.has(user.email)) {
            console.warn(`[RegisterUser] Este email (${user.email}) ya esta registrado para otro usuario`);
            throw new Error(`[RegisterUser] Este email (${user.email}) ya está registrado para otro usuario`);
        }
        else {
            this._users.set(user.email, user);
            console.log(`[RegisterUser] Usuario (${user.name}:${user.email}) registrado!`);
        }
    }
    updateUser(email, user) {
        if (!this._users.has(email)) {
            console.warn(`[UpdateUser] Este email (${email}) no esta registrado`);
            throw new Error(`[UpdateUser] Este email (${email}) no está registrado`);
        }
        else {
            this._users.delete(email);
            this._users.set(user.email, user);
            console.log(`[UpdateUser] Usuario (${user.name}:${user.email}) actualizado!`);
        }
    }
    deleteUser(email) {
        if (!this._users.has(email)) {
            console.warn(`[DeleteUser] Este email (${email}) no esta registrado`);
            throw new Error(`[DeleteUser] Este email (${email}) no está registrado`);
        }
        else {
            const user = this._users.get(email);
            this._users.delete(email);
            console.log(`[DeleteUser] Usuario (${user === null || user === void 0 ? void 0 : user.name}:${user === null || user === void 0 ? void 0 : user.email}) borrado!`);
        }
    }
    get usersList() {
        if (this._users.size === 0) {
            return "No hay usuarios registrados";
        }
        let users = [];
        this._users.forEach(user => {
            users.push(`Nombre: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Fecha de nacimiento: ${user.birthDate.toLocaleDateString()}\n`);
        });
        return users.join('\n');
    }
    /******************
    LOAN SECTION
    *******************/
    loanBook(email, isbn, borrowDate, loanDate) {
        if (!this._users.has(email)) {
            console.warn(`[LoanBook] Este email (${email}) no esta registrado`);
            throw new Error(`[LoanBook] Este email (${email}) no está registrado`);
        }
        else if (!this._books.has(isbn)) {
            console.warn(`[LoanBook] Este libro (${isbn}) no está en la librería`);
            throw new Error(`[LoanBook] Este libro (${isbn}) no está en la librería`);
        }
        else if (borrowDate >= loanDate) {
            console.warn(`[LoanBook] La fecha de préstamo (${loanDate.toLocaleDateString()}) no puede ser inferior a la de entrega (${borrowDate.toLocaleDateString()})`);
            throw new Error(`[LoanBook] La fecha de préstamo (${loanDate.toLocaleDateString()}) no puede ser inferior a la de entrega (${borrowDate.toLocaleDateString()})`);
        }
        else {
            const book = this._books.get(isbn);
            if (book && book.copies <= 0) {
                console.warn(`[LoanBook] No quedan copias disponibles del libro (${book === null || book === void 0 ? void 0 : book.title}:${book === null || book === void 0 ? void 0 : book.isbn})`);
                return;
            }
            else {
                book === null || book === void 0 ? void 0 : book.borrowBook();
                this._loans.push(new Loan_1.Loan(email, isbn, borrowDate, loanDate));
                const user = this._users.get(email);
                console.log(`[LoanBook] Libro (${book === null || book === void 0 ? void 0 : book.title}:${book === null || book === void 0 ? void 0 : book.isbn}) prestado a (${user === null || user === void 0 ? void 0 : user.name}:${user === null || user === void 0 ? void 0 : user.email})`);
            }
        }
    }
    returnBook(email, isbn, loanDate) {
        if (!this._users.has(email)) {
            console.warn(`[ReturnBook] Este email (${email}) no esta registrado`);
            throw new Error(`[ReturnBook] Este email (${email}) no está registrado`);
        }
        else if (!this._books.has(isbn)) {
            console.warn(`[ReturnBook] Este libro (${isbn}) no está en la librería`);
            throw new Error(`[ReturnBook] Este libro (${isbn}) no está en la librería`);
        }
        else {
            const loanIndex = this._loans.findIndex(loan => loan.isbn === isbn && loan.email === email);
            if (loanIndex != -1) {
                const book = this._books.get(isbn);
                book === null || book === void 0 ? void 0 : book.returnBook();
                if (this._loans[loanIndex].loanDate >= loanDate) {
                    console.log("[ReturnBook] El prestamo devuelto a tiempo!");
                }
                else {
                    console.warn(`[ReturnBook] Prestamo devuelto tarde, se debía devolver el ${this._loans[loanIndex].loanDate.toLocaleDateString()}`);
                }
                this._loans.splice(loanIndex, 1);
            }
            else {
                console.warn("[ReturnBook] El prestamo indicado no esta registrado, revisa el email y el isbn");
            }
        }
    }
    get loansList() {
        if (this._loans.length === 0) {
            return "No hay prestamos registrados";
        }
        let loans = [];
        this._loans.forEach(loan => {
            loans.push(`Email: ${loan.email}\n` +
                `ISBN: ${loan.isbn}\n` +
                `Fecha de préstamo: ${loan.borrowDate.toLocaleDateString()}\n` +
                `Fecha de devolución: ${loan.loanDate.toLocaleDateString()}\n`);
        });
        return loans.join('\n');
    }
}
exports.Library = Library;
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Book_1.Book]),
    __metadata("design:returntype", void 0)
], Library.prototype, "addBook", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Book_1.Book]),
    __metadata("design:returntype", void 0)
], Library.prototype, "updateBook", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Library.prototype, "removeBook", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", void 0)
], Library.prototype, "registerUser", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User_1.User]),
    __metadata("design:returntype", void 0)
], Library.prototype, "updateUser", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Library.prototype, "deleteUser", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date, Date]),
    __metadata("design:returntype", void 0)
], Library.prototype, "loanBook", null);
__decorate([
    logTraceToFile_1.logTraceToFile,
    logErrorToFile_1.logErrorsToFile,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date]),
    __metadata("design:returntype", void 0)
], Library.prototype, "returnBook", null);

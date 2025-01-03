"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
class Loan {
    constructor(_email, _isbn, _borrowDate, _loanDate) {
        this._email = _email;
        this._isbn = _isbn;
        this._borrowDate = _borrowDate;
        this._loanDate = _loanDate;
    }
    // Getter y Setter para 'email'
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    // Getter y Setter para 'isbn'
    get isbn() {
        return this._isbn;
    }
    set isbn(isbn) {
        this._isbn = isbn;
    }
    // Getter y Setter para 'borrowDate'
    get borrowDate() {
        return this._borrowDate;
    }
    set borrowDate(date) {
        if (date < this._loanDate) {
            this._borrowDate = date;
        }
        else {
            console.error("La fecha de préstamo no puede ser posterior o igual a la fecha de devolución.");
        }
    }
    // Getter y Setter para 'loanDate'
    get loanDate() {
        return this._loanDate;
    }
    set loanDate(date) {
        if (date > this._borrowDate) {
            this._loanDate = date;
        }
        else {
            console.error("La fecha de devolución no puede ser anterior o igual a la fecha de préstamo.");
        }
    }
}
exports.Loan = Loan;

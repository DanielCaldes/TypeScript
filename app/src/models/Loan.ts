import { ValidationUtils } from '../utils/ValidationUtils';

export class Loan{
    constructor(
        private _email : string,
        private _isbn : string,
        private _borrowDate : Date,
        private _loanDate : Date
    ){}

    // Getter y Setter para 'email'
    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    // Getter y Setter para 'isbn'
    public get isbn(): string {
        return this._isbn;
    }

    public set isbn(isbn: string) {
        this._isbn = isbn;
    }

    // Getter y Setter para 'borrowDate'
    public get borrowDate(): Date {
        return this._borrowDate;
    }

    public set borrowDate(date: Date){
        if (date < this._loanDate) {
            this._borrowDate = date;
        } else {
            console.error("La fecha de préstamo no puede ser posterior o igual a la fecha de devolución.");
        }
    }

    // Getter y Setter para 'loanDate'
    public get loanDate(): Date {
        return this._loanDate;
    }

    public set loanDate(date: Date) {
        if (date > this._borrowDate) {
            this._loanDate = date;
        } else {
            console.error("La fecha de devolución no puede ser anterior o igual a la fecha de préstamo.");
        }
    }
}
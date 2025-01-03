import { Book } from './Book';
import { User } from './User';
import { Loan } from './Loan';

import { UserActions } from '../interfaces/UserActions';
import { BookActions } from '../interfaces/BookActions';
import { LoanActions } from '../interfaces/LoanActions';

import { logTraceToFile } from '../decorators/logTraceToFile';
import { logErrorsToFile } from '../decorators/logErrorToFile';

export class Library implements UserActions,BookActions,LoanActions{
    private _books: Map<string, Book> = new Map();
    private _users: Map<string, User> = new Map();
    private _loans: Loan[] = [];

    /******************
    BOOKS SECTION
    *******************/
   @logTraceToFile @logErrorsToFile
    public addBook(book:Book):void{
        if (this._books.has(book.isbn)) {
            console.warn(`[AddBook] El libro (${book.title}:${book.isbn}) ya existe en la librería.`);
            throw new Error(`[AddBook] El libro (${book.title}:${book.isbn}) ya existe en la librería.`);
        } else {
            this._books.set(book.isbn, book);
            console.log(`[AddBook] El libro (${book.title}:${book.isbn}) ha sido añadido!`);
        } 
    }
    @logTraceToFile @logErrorsToFile
    public updateBook(isbn:string, book:Book):void{
        if (!this._books.has(isbn)) {
            console.warn(`[UpdateBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
            throw new Error(`[UpdateBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
        } else {
            this._books.delete(isbn);
            this._books.set(book.isbn, book);
            console.log(`[UpdateBook] Datos actualizados del libro (${book.title}:${book.isbn})!`);
        } 
    }
    @logTraceToFile @logErrorsToFile
    public removeBook(isbn : string):void{
        if (!this._books.has(isbn)) {
            console.warn(`[RemoveBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
            throw new Error(`[RemoveBook] El libro con isbn (${isbn}) no existe en la librería. Revisa el isbn`);
        } else {
            this._books.delete(isbn)
            console.log(`[RemoveBook] Libro con isbn (${isbn}) borrado!`);
        }
    }
    public get booksList(): string {
        if (this._books.size === 0) {
          return "No hay libros disponibles en la librería.";
        }

        let books: string[] = [];
        this._books.forEach((book) => {
            books.push(
                `Título: ${book.title}\n` +
                `Autor: ${book.author}\n` +
                `Año de publicación: ${book.year}\n` +
                `Género: ${book.genre}\n` +
                `Copias disponibles: ${book.copies}\n`
            );
        });

        return books.join("\n");
      }

    /******************
    USERS SECTION
    *******************/
    @logTraceToFile @logErrorsToFile
    public registerUser(user:User):void{
        if(this._users.has(user.email)){
            console.warn(`[RegisterUser] Este email (${user.email}) ya esta registrado para otro usuario`);
            throw new Error(`[RegisterUser] Este email (${user.email}) ya está registrado para otro usuario`);
        }
        else{
            this._users.set(user.email, user);
            console.log(`[RegisterUser] Usuario (${user.name}:${user.email}) registrado!`);
        }
    }
    @logTraceToFile @logErrorsToFile
    public updateUser(email:string, user:User):void{
        if(!this._users.has(email)){
            console.warn(`[UpdateUser] Este email (${email}) no esta registrado`);
            throw new Error(`[UpdateUser] Este email (${email}) no está registrado`);
        }
        else{
            this._users.delete(email);
            this._users.set(user.email, user);
            console.log(`[UpdateUser] Usuario (${user.name}:${user.email}) actualizado!`);
        }
    }
    @logTraceToFile @logErrorsToFile
    public deleteUser(email:string):void{
        if(!this._users.has(email)){
            console.warn(`[DeleteUser] Este email (${email}) no esta registrado`);
            throw new Error(`[DeleteUser] Este email (${email}) no está registrado`);
        }
        else{
            const user = this._users.get(email);
            this._users.delete(email);
            console.log(`[DeleteUser] Usuario (${user?.name}:${user?.email}) borrado!`);
        }
    }
    public get usersList():string{
        if(this._users.size === 0){
            return "No hay usuarios registrados";
        }
        let users : string[] = [];
        this._users.forEach(user => {
            users.push(
                `Nombre: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Fecha de nacimiento: ${user.birthDate.toLocaleDateString()}\n`
            );
        });
        return users.join('\n');
    }

    /******************
    LOAN SECTION
    *******************/
    @logTraceToFile @logErrorsToFile
    public loanBook(email:string, isbn:string, borrowDate:Date, loanDate:Date):void{
        if(!this._users.has(email)){
            console.warn(`[LoanBook] Este email (${email}) no esta registrado`);
            throw new Error(`[LoanBook] Este email (${email}) no está registrado`);
        }
        else if(!this._books.has(isbn)){
            console.warn(`[LoanBook] Este libro (${isbn}) no está en la librería`);
            throw new Error(`[LoanBook] Este libro (${isbn}) no está en la librería`);
        }else if(borrowDate>=loanDate){
            console.warn(`[LoanBook] La fecha de préstamo (${loanDate.toLocaleDateString()}) no puede ser inferior a la de entrega (${borrowDate.toLocaleDateString()})`);
            throw new Error(`[LoanBook] La fecha de préstamo (${loanDate.toLocaleDateString()}) no puede ser inferior a la de entrega (${borrowDate.toLocaleDateString()})`);
        }
        else{
            const book = this._books.get(isbn);
            if (book && book.copies <= 0) {
                console.warn(`[LoanBook] No quedan copias disponibles del libro (${book?.title}:${book?.isbn})`);
                return;
            }else{
                book?.borrowBook();
                this._loans.push(new Loan(email,isbn,borrowDate,loanDate));
                const user = this._users.get(email);
                console.log(`[LoanBook] Libro (${book?.title}:${book?.isbn}) prestado a (${user?.name}:${user?.email})`)
            }
        }
    }
    @logTraceToFile @logErrorsToFile
    public returnBook(email:string,isbn:string, loanDate:Date):void{
        if(!this._users.has(email)){
            console.warn(`[ReturnBook] Este email (${email}) no esta registrado`);
            throw new Error(`[ReturnBook] Este email (${email}) no está registrado`);
        }
        else if(!this._books.has(isbn)){
            console.warn(`[ReturnBook] Este libro (${isbn}) no está en la librería`);
            throw new Error(`[ReturnBook] Este libro (${isbn}) no está en la librería`);
        }
        else{
            const loanIndex = this._loans.findIndex(loan => loan.isbn === isbn && loan.email === email);

            if(loanIndex != -1){
                const book = this._books.get(isbn);
                book?.returnBook();
                if(this._loans[loanIndex].loanDate >= loanDate){
                    console.log("[ReturnBook] El prestamo devuelto a tiempo!");
                }
                else{
                    console.warn(`[ReturnBook] Prestamo devuelto tarde, se debía devolver el ${this._loans[loanIndex].loanDate.toLocaleDateString()}`);
                }
                this._loans.splice(loanIndex,1);
            }
            else{
                console.warn("[ReturnBook] El prestamo indicado no esta registrado, revisa el email y el isbn")
            }
        }
    }
    public get loansList():string{
        if(this._loans.length === 0){
            return "No hay prestamos registrados";
        }
        let loans : string[] = [];
        this._loans.forEach(loan => {
            loans.push(
                `Email: ${loan.email}\n` +
                `ISBN: ${loan.isbn}\n` +
                `Fecha de préstamo: ${loan.borrowDate.toLocaleDateString()}\n` +
                `Fecha de devolución: ${loan.loanDate.toLocaleDateString()}\n`
            );
        });
        return loans.join('\n');
    }
}
import { Book } from '../models/Book';

export interface BookActions {
    addBook(book: Book): void;
    updateBook(isbn: string, book: Book): void;
    removeBook(isbn: string): void;
    get booksList(): string;
}
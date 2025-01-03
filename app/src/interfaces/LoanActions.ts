export interface LoanActions {
    loanBook(email: string, isbn: string, borrowDate: Date, loanDate: Date): void;
    returnBook(email: string, isbn: string, loanDate: Date): void;
    get loansList(): string;
}
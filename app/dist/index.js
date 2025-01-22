"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./models/Book");
const User_1 = require("./models/User");
const Library_1 = require("./models/Library");
const LogUtils_1 = require("./utils/LogUtils");
//Para compilar a javascript -> tsc
const library = new Library_1.Library(); //Instancia principal de la clase
//Diferentes vistas para gestionar áreas específicas
const bookManager = library;
const userManager = library;
const loanManager = library;
//Limpiar la traza
LogUtils_1.LogUtils.clearLogContent("trace-log.txt");
LogUtils_1.LogUtils.clearLogContent("error-log.txt");
// AÑADIR NUEVOS LIBROS
// Éxito
bookManager.addBook(new Book_1.Book("978-0-545-01022-1", "Harry Potter y las Reliquias de la Muerte", "J.K. Rowling", 2007, "Fantasía", 10));
bookManager.addBook(new Book_1.Book("978-0-345-33968-3", "El Hobbit", "J.R.R. Tolkien", 1937, "Fantasía", 2));
// Error: Ya existe
bookManager.addBook(new Book_1.Book("978-0-545-01022-1", "Harry Potter y las Reliquias de la Muerte", "J.K. Rowling", 2007, "Fantasía", 10));
// MODIFICAR UN LIBRO
// Error: No existe
bookManager.updateBook("978-0-7432-7356-5", new Book_1.Book("978-0-7432-7356-5", "El gran Gatsby 2.0", "F. Scott Fitzgerald", 1925, "Ficción", 4));
// Éxito
bookManager.updateBook("978-0-545-01022-1", new Book_1.Book("978-0-545-01022-1", "Harry Potter y las Reliquias de la Muerte", "J.K. Rowling", 2007, "Fantasía", 8));
// ELIMINAR UN LIBRO
// Error: No existe
bookManager.removeBook("978-1-85326-000-1");
// Éxito
bookManager.removeBook("978-0-545-01022-1");
// REGISTRAR USUARIO
//Éxito
userManager.registerUser(new User_1.User("Juan Carlos", "juancar@example.com", new Date("1990-05-15")));
userManager.registerUser(new User_1.User("Ana López", "ana@example.com", new Date("1985-07-22")));
// Error: Ya existe
userManager.registerUser(new User_1.User("Juan Carlos", "juancar@example.com", new Date("1990-05-15")));
// ACTUALIZAR USUARIO
// Error: No existe
userManager.updateUser("carlosg@example.com", new User_1.User("Carlos Gómez", "carlosg@example.com", new Date("1992-11-30")));
// Éxito
userManager.updateUser("juancar@example.com", new User_1.User("Juan Carlos", "juancar@example.com", new Date("1990-05-15")));
// ELIMINAR USUARIO
// Error: No existe
userManager.deleteUser("maría.p@example.com");
// Éxito
userManager.deleteUser("juancar@example.com");
// PRESTAR LIBROS
// Éxito
loanManager.loanBook("ana@example.com", "978-0-345-33968-3", new Date("2025-01-04"), new Date("2025-02-04"));
loanManager.loanBook("ana@example.com", "978-0-345-33968-3", new Date("2025-01-04"), new Date("2025-02-04"));
// Error: Usuario no registrado
loanManager.loanBook("juancar@example.com", "978-0-261-10236-9", new Date("2025-01-07"), new Date("2025-02-07"));
// Error: Libro no registrado
loanManager.loanBook("ana@example.com", "978-0-261-10236-9", new Date("2025-01-07"), new Date("2025-02-07"));
// Error: No quedan copias
loanManager.loanBook("ana@example.com", "978-0-345-33968-3", new Date("2025-01-04"), new Date("2025-02-04"));
// DEVOLVER LIBROS
// Éxito
loanManager.returnBook("ana@example.com", "978-0-345-33968-3", new Date("2025-02-03"));
// Error: Devuelto tarde
loanManager.returnBook("ana@example.com", "978-0-345-33968-3", new Date("2025-02-10"));
// Error: Usuario no registrado
loanManager.returnBook("juancar@example.com", "978-0-7432-7356-5", new Date("2025-02-08"));
//Error: Libro no registrado
loanManager.returnBook("ana@example.com", "978-0-7432-7356-5", new Date("2025-02-08"));
//Error: No está registrado el prestamo
loanManager.returnBook("ana@example.com", "978-0-345-33968-3", new Date("2025-02-03"));
// IMPRIMIR LISTAS
console.log("[Books List]\n" + bookManager.booksList);
console.log("[Users List]\n" + userManager.usersList);
console.log("[Loans List]\n" + loanManager.loansList);

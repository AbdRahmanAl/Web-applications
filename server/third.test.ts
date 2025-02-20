import { Book } from "./src/model/book";
import { Page } from "./src/model/page"
import { BookService } from "./src/service/book"
import { UserService } from "./src/service/user";

let bookService : BookService;
let username : string;
username = "dummy";


beforeEach(() => {
    const userService = new UserService();
    bookService = new BookService(userService);
    userService.createUser(username, "123");
})

test('Getting the initial list of books should return the empty list', async () => {
    expect(await bookService.getBooks(username)).toStrictEqual([]);
})

test('Creating a book should return a book with the correct description and empty pages', async () => {
    const book : Book = await bookService.addBook(username,"Arabic", []);
    expect(book.category).toStrictEqual("Arabic");
    expect(book.pages.length == 0).toBeTruthy();
})

test('After creating a book, the new book should be in the list of books', async () => {
    const book : Book = await bookService.addBook(username,"Arabic", []);
    expect(await bookService.getBooks(username)).toContainEqual(book);
})

test('After adding book pages, the book should contain the respective pages', async () => {
    const book : Book = await bookService.addBook(username,"Arabic", []);
    const pages : Page[] = await bookService.getPages(username,book.category);
    expect(book.pages == pages);
})

test('If we try to add a page to a book that does not exist, the server sends a message that says the book does not exist',
    async () => {expect(await bookService.addPage(username,"Pizza",[""],"Western")).toBe("Book does not exist");
})
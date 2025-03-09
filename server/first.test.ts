import test from "node:test";
import { BookService } from "./src/service/book";

test("If a category is added to the books then it should be in the list", async () => {
    const category = "NewCategory";
    const bookService = new BookService();
    const username = "dummy";
    await bookService.addBook(username, category, []);
    const books = await bookService.getBooks(username);
    expect(books.some((book) => book.category === category)).toBeTruthy;
})


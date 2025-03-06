import test from "node:test";
import { BookService } from "./src/service/book";
import { UserService } from "./src/service/user";

test("If a category is added to the books then it should be in the list", async () => {
    const category = "NewCategory";
    const userService = new UserService();
    const bookService = new BookService(userService);
    const username = "dummy";
    userService.createUser(username, "123");
    await bookService.addBook(username, category, []);
    const books = await bookService.getBooks(username);
    expect(books.some((book) => book.category === category)).toBeTruthy;
})


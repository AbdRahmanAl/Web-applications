import { BookService } from "./src/service/book";

test("If a category is added to the books then it should be in the list", async () => {
    const desc = "Test adding new category";
    const taskService = new BookService();
    await taskService.addBook(desc, []);
    const tasks = await taskService.getBooks();
    expect(tasks.some((task) => task.category === desc)).toBeTruthy;
})
import { BookModel } from "../db/book.db";
import { PageModel } from "../db/page.db";
import { UserModel } from "../db/user.db";
import { IBookService } from "./IBookService";
import { Book } from "../model/book";
import { Page } from "../model/page";
//

export class BookService implements IBookService {
  async getBooks(username: string): Promise<Book[]> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return [];

    const books = await BookModel.findAll({ where: { userId: user.id } });
    return books.map((book : BookModel) => ({ category: book.category, pages: []}));
  }

  async getPages(username: string, category: string): Promise<Page[]> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return [];

    const book = await BookModel.findOne({ where: { category, userId: user.id } });
    if (!book) return [];

    const pages = await PageModel.findAll({ where: { bookId: book.id } });
    return pages.map((page : Page) => ({ title: page.title, contents: page.contents }as Page));
  }

  async addBook(username: string, category: string, pages: Page[]): Promise<Book> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) throw new Error("User does not exist");

    const exists = await BookModel.findOne({where: {category, userId: user.id}});

    if(exists) throw new Error("Book already exists");

    const book = await BookModel.create({ category, userId: user.id });

    if (pages.length > 0) {
    await PageModel.bulkCreate(
      pages.map(page => ({ ...page, bookId: book.id }))
    );
  }

    return { category: book.category, pages };
  }

  async addPage(username: string, title: string, contents: string[], category: string): Promise<string | Book> {
    //find user by username
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return "User does not exist";

    const book = await BookModel.findOne({ where: { category, userId: user.id } });
    if (!book) return "Book does not exist";

    const existingPage = await PageModel.findOne({ where: { title, bookId: book.id } });
    if (existingPage) return "Recipe already exists";
    //store new page
  await PageModel.create({ title, contents, bookId: book.id });
  return { category: book.category, pages: await PageModel.findAll({ where: { bookId: book.id } }) };
  }

  async removeBook(username: string, category: string): Promise<string> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return "User does not exist";

    const book = await BookModel.findOne({ where: { category, userId: user.id } });
    if (!book) return "Book does not exist";

    await book.destroy();
    return "Book deleted";
  }

  async removePage(username: string, index: number, category: string): Promise<string> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return "User does not exist";

    const book = await BookModel.findOne({ where: { category, userId: user.id } });
    if (!book) return "Book does not exist";

    const pages = await PageModel.findAll({ where: { bookId: book.id } });
    if (index < 0 || index >= pages.length) return "Page does not exist";

    await pages[index].destroy();
    return "Page deleted";
  }

  async findbook(username: string, category: string): Promise<boolean> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return false;

    const book = await BookModel.findOne({ where: { category, userId: user.id } });
    return book !== null;
  }

  async findRecipe(username: string, recipe: string): Promise<string | undefined> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return "User does not exist";

    const books = await BookModel.findAll({ where: { userId: user.id } });

    for (const book of books) {
      const pages = await PageModel.findAll({ where: { bookId: book.id } });
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].title.toLowerCase() === recipe.toLowerCase()) {
        return JSON.stringify({ category: book.category, index: i});
        }
      }
    }

    return undefined; //if recipe doesnt exist
  }
}


  /*async addIngredients(category: string, title: string, ingredients: [string]) {
    const book = this.books.find((book) => book.category === category);
    if (book?.pages.find((e) => e.title == title)) {
      return "Recipe already exist";
    }
    if (!book) {
      return "Book does not exist";
    }
    book.pages.push({ title: title, contents: ingredients });
    return "Recipe added";
  }*/


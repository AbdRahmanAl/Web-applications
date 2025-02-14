import { Book } from "../model/book";
import { Page } from "../model/page";

export class BookService {
  private books: Book[] = [];

  // Returns a deep copy of the current list of books
  async getBooks(): Promise<Book[]> {
    return JSON.parse(JSON.stringify(this.books));
  }

  async getPages(category: string): Promise<Page[]> {
    const book = this.books.find((book) => book.category === category);
    return JSON.parse(JSON.stringify(book?.pages));
  }

  // Creates a new book with the given contents and adds it to the list
  // Returns a copy of the newly created book
  async addBook(category: string, pages: Page[]): Promise<Book> {
    const book = {
      category: category,
      pages: pages,
    };
    this.books.push(book);
    return { ...book };
  }

  async addPage(title: string, contents: [string], category: string) {
    const book = this.books.find((book) => book.category === category);
    if (book) {
      const page = { title, contents } as Page;
      book?.pages.push(page);
      return book;
    }
    return "Book does not exist";
  }

  async removePage(index: number, category: string) {
    const book = this.books.find((book) => book.category === category);
    if (!book?.pages[index]) {
      return "Page does not exist";
    }
    book.pages.splice(index, 1);
    return "Page deleted";
  }

  async removeBook(category: string) {
    const book = this.books.find((book) => book.category === category);
    if (!book) {
      return "Book does not exist";
    }
    this.books = this.books.filter((obj) => obj !== book);
    return "Book deleted";
  }

  async findbook(category: string) {
    const book = this.books.find((book) => book.category === category);
    if (!book) {
      return false;
    }
    return true;
  }

  async findRecipe(recipe: string) {
    for (const book of this.books) {
      for (let i = 0; i < book.pages.length; i++) {
        let title: string = book.pages[i].title.toLowerCase();
        let rec: string = recipe.toLowerCase();
        if (title === rec) {
          return JSON.stringify({ category: book.category, index: i });
        }
      }
    }
    return "Recipe does not exist";
  }

  async addIngredients(category: string, title: string, ingredients: [string]) {
    const page: Page[] = [{ title: title, contents: ingredients }];

    const book = this.books.find((book) => book.category === category);
    if (book?.pages.find((e) => e.title == title)) {
      return "Recipe already exist";
    }
    if (!book) {
      return "Book does not exist";
    }
    book.pages.push({ title: title, contents: ingredients });
    return "Recipe added";
  }
}

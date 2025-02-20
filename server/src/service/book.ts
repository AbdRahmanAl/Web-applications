import { Book } from "../model/book";
import { Page } from "../model/page";
import { User } from "../model/user";
import { UserService } from "./user";

export class BookService {
  private userService: UserService;
  
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Returns a deep copy of the current list of books
  async getBooks(username: string): Promise<Book[]> {
    const user : User | undefined = await this.userService.findUser(username);
    return JSON.parse(JSON.stringify(user?.books));
  }

  async getPages(username: string, category: string): Promise<Page[]> {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      const book = user.books.find((book) => book.category === category);
      return JSON.parse(JSON.stringify(book?.pages));
    }
    return [];
  }

  // Creates a new book with the given contents and adds it to the list
  // Returns a copy of the newly created book
  async addBook(
    username: string,
    category: string,
    pages: Page[]
  ): Promise<Book> {
    const book = {
      category: category,
      pages: pages,
    };
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      user.books.push(book);
      return { ...book };
    }
    return  { category: '', pages: []};
  }

  async addPage(
    username: string,
    title: string,
    contents: [string],
    category: string
  ) {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      const book = user.books.find((book) => book.category === category);
      if (book) {
        const look = book.pages.find((book) => book.title === title);
        if(!look) {
          const page = { title, contents } as Page;
          book?.pages.push(page);
          return book;
        }
        return "Recipe already exists"
      }
      return "Book does not exist";
    }
    return "User does not exist";
  }

  async removePage(username: string, index: number, category: string) {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      const book = user.books.find((book) => book.category === category);
      if (!book?.pages[index]) {
        return "Page does not exist";
      }
      book.pages.splice(index, 1);
      return "Page deleted";
    }
  }

  async removeBook(username: string, category: string) {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      const book = user.books.find((book) => book.category === category);
      if (!book) {
        return "Book does not exist";
      }
      user.books = user.books.filter((obj) => obj !== book);
      return "Book deleted";
    }
  }

  async findbook(username: string, category: string) {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      const book = user.books.find((book) => book.category === category);
      if (!book) {
        return false;
      }
      return true;
    }
  }

  async findRecipe(username: string, recipe: string) {
    const user : User | undefined = await this.userService.findUser(username);
    if (user) {
      for (const book of user.books) {
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
}

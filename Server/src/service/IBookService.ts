import { Book } from "../model/book";
import { Page } from "../model/page";





export interface IBookService {
  getBooks(username: string): Promise<Book[]>;
  getPages(username: string, category: string): Promise<Page[]>;
  addBook(username: string, category: string, pages: Page[]): Promise<Book>;
  addPage(username: string,title: string,contents: [string],category: string) : Promise<string | Book>;
  removePage(username: string, index: number, category: string) : Promise<string | undefined>; 
  removeBook(username: string, category: string) : Promise<string | undefined>;
  findbook (username: string, category: string): Promise<boolean | undefined>;
  findRecipe (username: string, recipe: string): Promise<string | undefined>;
}

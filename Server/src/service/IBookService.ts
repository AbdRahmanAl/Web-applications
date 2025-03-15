import { Book } from "../model/book"; // Importing the Book model
import { Page } from "../model/page"; // Importing the Page model





export interface IBookService {
  // Retrieve all books for a given user
  getBooks(username: string): Promise<Book[]>;
  // Retrieve all pages of a specific book category for a user
  getPages(username: string, category: string): Promise<Page[]>;
  // Add a new book with a specified category and initial pages
  addBook(username: string, category: string, pages: Page[]): Promise<Book>; 
  // Add a new page to an existing book, return either success message or updated book
  addPage(username: string,title: string,contents: [string],category: string) : Promise<string | Book>;
  // Remove a specific page from a book by index, return success message or undefined if failed
  removePage(username: string, index: number, category: string) : Promise<string | undefined>; 
  // Remove a book from the user's collection, return success message or undefined if failed
  removeBook(username: string, category: string) : Promise<string | undefined>;
  // Check if a book with the specified category exists for a user
  findbook (username: string, category: string): Promise<boolean | undefined>;
  // Search for a specific recipe in the user's books, return the category where it's found
  findRecipe (username: string, recipe: string): Promise<string | undefined>;
}

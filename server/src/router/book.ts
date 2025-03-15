import express, { Request, Response, Router } from "express";
import { BookService } from "../service/book";
import { Book } from "../model/book";
import { Page } from "../model/page";

//Create and return a router for handling book-related API endpoints.
export function bookRouter(bookService: BookService): Router {
  const bookRouter = express.Router();// Initialize the router

  interface BookRequest {
    session: any;
  }
  
  //Retrieve all books for the logged-in user.
  bookRouter.get(
    "/book",
    async (req: BookRequest, res: Response<Array<Book> | String>) => {
      try {
        if (!req.session.username) {
          res.status(401).send("Not logged in");
          return;
        }

        const books = await bookService.getBooks(req.session.username); // Fetch user's books
        res.status(200).send(books);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface GetBookPagesRequest extends Request {
    params: { category: string };
    session: any;
  }
  
  //Retrieve all pages from a specific book category.
  bookRouter.get(
    "/book/pages/:category",
    async (req: GetBookPagesRequest, res: Response<Array<Page> | string>) => {
      try {
        const pages = await bookService.getPages(
          req.session.username,
          req.params.category
        );
        res.status(200).send(pages);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface GetRecipeRequest extends Request {
    params: { recipe: string };
    session: any;
  }
  
  //Searche for a specific recipe across all books.
  bookRouter.get(
    "/book/find/:recipe",
    async (req: GetRecipeRequest, res: Response<Page | string>) => {
      try {
        const recipe = await bookService.findRecipe(
          req.session.username,
          req.params.recipe
        );
        res.status(200).send(recipe);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface NewBookRequest extends Request {
    body: { category: string };
    session: any;
  }
  
  //Add a new book (category) for the logged-in user.
  bookRouter.post(
    "/book",
    async (req: NewBookRequest, res: Response<Book | string>) => {
      try {
        if (!req.session.username) {
          res.status(401).send("Not logged in");
          return;
        }
        const condition = await bookService.findbook(
          req.session.username,
          req.body.category
        );
        if (condition) {
          res.status(404).send("Book already exists");
          return;
        }
        const newBook = await bookService.addBook(
          req.session.username,
          req.body.category,
          []
        );
        res.status(201).send(newBook);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface NewPageRequest extends Request {
    params: { category: string };
    body: { title: string; contents: [string] };
    session: any;
  }
  
  //Add a new page (recipe) to an existing book category.
  bookRouter.post(
    "/book/:category",
    async (req: NewPageRequest, res: Response<Book | string>) => {
      try {
        const condition = await bookService.findbook(
          req.session.username,
          req.params.category
        );
        if (condition) {
          const newTask = await bookService.addPage(
            req.session.username,
            req.body.title,
            req.body.contents,
            req.params.category
          );
          res.status(201).send(newTask);
          return;
        }
        res.status(404).send("Book does not exist!");
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface DeleteBookRequest extends Request {
    body: { category: string };
    session: any;
  }

  //Delete an entire book category
  bookRouter.delete(
    "/book/delete",
    async (req: DeleteBookRequest, res: Response<Book | string>) => {
      try {
        const newTask = await bookService.removeBook(
          req.session.username,
          req.body.category
        );
        res.status(200).send(newTask);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface DeletePageRequest extends Request {
    params: { category: string };
    body: { index: number };
    session: any;
  }

  //Delete a specific page from a book
  bookRouter.delete(
    "/book/:category/delete",
    async (req: DeletePageRequest, res: Response<Book | string>) => {
      try {
        const newTask = await bookService.removePage(
          req.session.username,
          req.body.index,
          req.params.category
        );
        res.status(200).send(newTask);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  interface AddPageRequest extends Request {
    body: { category: string; title: string; ingredients: [string] };
    session: any;
  }
/**
   * Add a new recipe page to a book category.
   * Ensure input validation before proceeding.
   */
  bookRouter.put(
    "/book/page",
    async (req: AddPageRequest, res: Response<any>) => {
      try {
        const user = req.session.username;
        const title = req.body.title;
        const category = req.body.category;
        const ingredients = req.body.ingredients;

        if (typeof category !== "string") {
          return res.status(400).send("Book category must be a string");
        }
        if (typeof title !== "string") {
          return res.status(400).send("Page title must be a string");
        }
        if (!Array.isArray(ingredients)) {
          return res
            .status(400)
            .send("Ingredients must be an array of strings");
        }

        const newPage = await bookService.addPage(
          user,
          title,
          ingredients,
          category
        );

        res.status(201).json(newPage);
      } catch (e: any) {
        res.status(500).send({ error: e.message });
      }
    }
  );
  return bookRouter; // Return the configured router
}

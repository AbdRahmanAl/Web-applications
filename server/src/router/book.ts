import express, { Request, Response } from "express";
import { BookService } from "../service/book";
import { Book } from "../model/book";
import { Page } from "../model/page";

const bookService = new BookService();

export const bookRouter = express.Router();

bookRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Book> | String>
) => {
    try {
        const tasks = await bookService.getBooks();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.get("/pages", async (
    req: Request<{}, {}, {category : string}>,
    res: Response<Array<Page> | string>
) => {
    try {
        const tasks = await bookService.getPages(req.body.category);
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.get("/find", async (
    req: Request<{}, {}, {recipe : string}>,
    res: Response<Array<Page> | string>
) => {
    try {
        const tasks = await bookService.findRecipe(req.body.recipe);
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.post("/", async (
    req: Request<{}, {}, {category : string}>,
    res: Response<Book | string>
) => {
    try {
        // TODO Type checking
        const condition = await bookService.findbook(req.body.category);
        if(condition) {
        res.status(404).send("Book already exists");
        return;
        }
        const newTask = await bookService.addBook(req.body.category, []);
        res.status(201).send(newTask);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

bookRouter.post("/:category", async (
    req: Request<{ category: string }, {}, { title: string, contents: [string] }>,
    res: Response<Book | string>
) => {
    
    try {
        const condition = await bookService.findbook(req.params.category);
        if(condition) {
            const newTask = await bookService.addPage(req.body.title, req.body.contents, req.params.category);
            res.status(201).send(newTask);
            return;
        }
        res.status(404).send("Book does not exist!");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.patch("/delete", async (
    req: Request<{}, {}, { category: string }>,
    res: Response<Book | string>
) => {
    
    try {
        const newTask = await bookService.removeBook(req.body.category);
        res.status(200).send(newTask);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.patch("/:category/delete", async (
    req: Request<{ category: string }, {}, { index: number}>,
    res: Response<Book | string>
) => {
    try {
        const newTask = await bookService.removePage(req.body.index, req.params.category);
        res.status(200).send(newTask);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
import { Book } from "./book";

export interface User {
    username: string,
    password: string,
    books: Book[]
}
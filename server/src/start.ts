import express from "express";
import { bookRouter } from "./router/book";
import cors from "cors";


export const app = express();

app.use(express.json()); // Middleware
app.use(cors());
app.use("/book", bookRouter);
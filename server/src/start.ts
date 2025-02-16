import express from "express";
import { bookRouter } from "./router/book";
import cors from "cors";


export const app = express();

app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
  });

app.use(express.json()); // Middleware
app.use(cors());
app.use("/book", bookRouter);
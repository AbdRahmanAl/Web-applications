import express from "express";
import { bookRouter } from "./router/book";
import cors from "cors";
import session from "express-session";
import { userRouter } from "./router/user";
import { BookService } from "./service/book";
import { UserService } from "./service/user";
import dotenv from "dotenv";

export const app = express();
dotenv.config();// Load environment variables from .env file
// Ensure SESSION_SECRET is set in the environment variables
if (! process.env.SESSION_SECRET) {
  console.log("Could not find SESSION_SECRET in .env file");
  process.exit();
}
// Configure session management
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true
}));
app.use(cors({
  origin: true,
  credentials: true
}));

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json()); // Middleware

// Create service instances for handling user and book operations
const userService = new UserService();
const bookService = new BookService();


// Register API routes for books and users
app.use(bookRouter(bookService));
app.use(userRouter(userService));

import express, { Request, Response, Router } from "express";
import { UserService } from "../service/user";
import { User } from "../model/user";

//Create and return a router for handling user authentication.
export function userRouter(userService: UserService): Router {
    const userRouter = express.Router();// Initialize the router

    interface UserRequest extends Request {
        body: { username: string, password: string },
        session: any
    }

    interface LoggedUserRequest extends Request {
        session: any
    }

    //Register a new user.
    userRouter.post("/user", async (req: UserRequest, res: Response) => {
        userService.createUser(req.body.username, req.body.password);
        res.status(201).send({username: req.body.username});
    })

    //Log in a user by verifying credentials
    userRouter.post("/user/login", async (req: UserRequest, res: Response) => {
        const user: User | undefined = await userService.findUser(req.body.username, req.body.password);
        if (!user) {
            res.status(401).send("No such username or password");
            return;
        }
        req.session.username = req.body.username; // Login
        res.status(200).send("Logged in");
    })

    //Log out the current user by clearing the session.
    userRouter.post("/user/logout", async (req: LoggedUserRequest, res: Response) => {
        if (req.session.username) {
            req.session.username = undefined; // Logout
            res.status(200).send("Logged out");
        }
    })

    return userRouter;
}

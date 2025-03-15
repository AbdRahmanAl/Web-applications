import {User} from "../model/user";// Importing the User model



export interface IUserService {
    // Create a new user with the given username and password
    createUser(username: string, password: string): Promise<void>;
    // Find a user by username, with an optional password check
    // Return the user object if found, otherwise return undefined
    findUser(username: string, password?: string): Promise<User | undefined>;
  }
  

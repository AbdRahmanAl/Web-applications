import {User} from "../model/user";
import bcrypt from "bcrypt";
import {IUserService} from "./IUserService";
import UserModel from "../db/user.db";

const salt = bcrypt.genSaltSync(10);

//export class UserService{
    export class UserService implements IUserService {

    users : User[] = [];

    //Create a new user with a hashed password and store it in the database.
    async createUser(username: string, password: string) {
        /*this.users.push({
            username: username,
            password: bcrypt.hashSync(password, salt),
            books: []
        });*/
         // Check if user already exists before creating a new entry
        if(!this.findUser(username) || this.findUser(username) == undefined) {
            UserModel.create({ username: username, password: bcrypt.hashSync(password, salt)});
        }
    }

    //Find a user by username and optionally verify the password.
    async findUser(username: string, password ?: string): Promise<User | undefined> {
        const user = await UserModel.findOne({ where: { username } });
        if (! password) {
            if(!user) { 
                return undefined;
            } else {
                return user;
            }
        }
        // If password is provided, verify it against the stored hashed password
        if(user?.username === username && await bcrypt.compare(password, user.password)) {
            return user;
        }
    }

}

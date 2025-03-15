import {User} from "../model/user";
import bcrypt from "bcrypt";
import {IUserService} from "./IUserService";
import UserModel from "../db/user.db";

const salt = bcrypt.genSaltSync(10);

//export class UserService{
    export class UserService implements IUserService {

    users : User[] = [];

    async createUser(username: string, password: string) {
        /*this.users.push({
            username: username,
            password: bcrypt.hashSync(password, salt),
            books: []
        });*/
        if(!this.findUser(username) || this.findUser(username) == undefined) {
            UserModel.create({ username: username, password: bcrypt.hashSync(password, salt)});
        }
    }

    async findUser(username: string, password ?: string): Promise<User | undefined> {
        const user = await UserModel.findOne({ where: { username } });
        if (! password) {
            if(!user) {
                return undefined;
            } else {
                return user;
            }
        }
        if(user?.username === username && await bcrypt.compare(password, user.password)) {
            return user;
        }
    }

}
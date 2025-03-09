import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './conn';
import { BookModel } from './book.db';

export class UserModel extends Model {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);


// Associations
UserModel.hasMany(BookModel, { foreignKey: 'userId' });
BookModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default UserModel;


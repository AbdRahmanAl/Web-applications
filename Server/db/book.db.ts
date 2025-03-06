import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from './conn';
import { PageModel } from './page.db';
import { UserModel } from './user.db';
export class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> {
    declare id: CreationOptional<number>;
    declare category: string;
    declare userId: ForeignKey<UserModel['id']>;
}
BookModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Book'
    }
);

BookModel.hasMany(PageModel, { foreignKey: 'bookId', onDelete: "CASCADE" }); // Deletes pages when book is deleted
PageModel.belongsTo(BookModel, { foreignKey: 'bookId' });

export default BookModel;




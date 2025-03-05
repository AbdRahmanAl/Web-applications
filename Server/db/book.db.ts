import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from './conn';
import { PageModel } from './page.db';

export class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> {
    declare id: CreationOptional<number>;
    declare category: string;
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
        }
    },
    {
        sequelize,
        modelName: 'Book'
    }
);

// Associations
BookModel.hasMany(PageModel, { foreignKey: 'bookId' });
PageModel.belongsTo(BookModel, { foreignKey: 'bookId' });
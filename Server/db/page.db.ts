import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './conn';
import { BookModel } from './book.db';

export class PageModel extends Model {
    declare id: CreationOptional<number>;
    declare title: string;
    declare contents: string;
}

PageModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Page'
    }
);


// Associations
BookModel.hasMany(PageModel, { foreignKey: 'bookId' });
PageModel.belongsTo(BookModel, { foreignKey: 'bookId' });

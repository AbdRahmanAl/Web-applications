import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from './conn';
import { BookModel } from './book.db';


export class PageModel extends Model {
    declare id: CreationOptional<number>;
    declare title: string;
    declare contents: [string];
    declare bookId: ForeignKey<BookModel['id']>;
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
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Page'
    }
);

export default PageModel;


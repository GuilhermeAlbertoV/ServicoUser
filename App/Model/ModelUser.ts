import { DataTypes, Model } from 'sequelize';
import connectionDB from '../DB/connectionDB';

class UserModel extends Model {
  public id!: number;
  public username!: string;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public age!: number;
  public image!: Buffer;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    sequelize: connectionDB.sequelize,
    modelName: 'UserModel',
    tableName: 'usuarios',
  },
);

export default UserModel;
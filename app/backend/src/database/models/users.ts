import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  private id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default User;

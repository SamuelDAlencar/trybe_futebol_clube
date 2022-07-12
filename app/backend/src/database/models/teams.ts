import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  private id: number;
  public teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Team;

import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  private id: number;
  public teamname: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamname: DataTypes.STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Team;

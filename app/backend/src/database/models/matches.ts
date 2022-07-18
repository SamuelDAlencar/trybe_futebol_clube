import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './teams';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
  public teamAway: string;
  public teamHome: string;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Team',
        key: 'id',
      },
    },
    homeTeamGoals: DataTypes.INTEGER,
    awayTeam: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Team',
        key: 'id',
      },
    },
    awayTeamGoals: DataTypes.INTEGER,
    inProgress: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(Team, { as: 'teamHome', foreignKey: 'homeTeam' });
Match.belongsTo(Team, { as: 'teamAway', foreignKey: 'awayTeam' });

export default Match;

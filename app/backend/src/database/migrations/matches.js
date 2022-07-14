module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        // references: {
          // model: 'Teams',
          // key: 'id',
        // }
      },
      homeTeamGoals: Sequelize.INTEGER,
      awayTeam: {
        type: Sequelize.INTEGER,
        // references: {
          // model: 'Teams',
          // key: 'id',
        // }
      },
      awayTeamGoals: Sequelize.INTEGER,
      inProgress: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
}

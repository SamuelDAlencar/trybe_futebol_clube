module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      homeTeam: Sequelize.INTEGER,
      homeTeamGoals: Sequelize.INTEGER,
      awayTeam: Sequelize.INTEGER,
      awayTeamGoals: Sequelize.INTEGER,
      inProgress: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
}

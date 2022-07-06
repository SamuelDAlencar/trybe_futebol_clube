
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      teamName: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
}

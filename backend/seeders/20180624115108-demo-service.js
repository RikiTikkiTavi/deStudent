module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'service_content',
      [
        {
          name: 'TestServiceName',
          content: 'TestServiceContent'
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('service_content', null, {})
};

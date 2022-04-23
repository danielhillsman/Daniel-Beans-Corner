const sequelize = require('../config/connection');
const { User, Car } = require('../models');
const carData = require('./carData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
 
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Car.bulkCreate(carData)
  process.exit(0);
};

seedDatabase();

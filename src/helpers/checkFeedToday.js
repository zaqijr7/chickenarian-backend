const petsModel = require('../models/pets');

module.exports = async () => {
  const getAllPets = await petsModel.checkFeedToday
}
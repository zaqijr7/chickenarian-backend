const petsModel = require('../models/pets');

exports.feeding = async (req, res) => {
  const { id_pets, isFeed, typeOfFeed } = req.body;
  const getPet = await petsModel.getPetId({});
  
}

exports.siclusPets = async (data) => {
  const getAllPets = await petsModel.getAllPets(data);
  console.log(getAllPets, 'INI HASIL AMBIL SEMUA PETS');
}
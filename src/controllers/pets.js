const petsModel = require('../models/pets');
const response = require('../helpers/response');

const pets = [
  { "id": 0, "pet_name": "Marlène", "isAlive": true, "evolutionStage": 1, "evolutionProgress": 0.0 },
  { "id": 1, "pet_name": "Ruò", "isAlive": true, "evolutionStage": 0, "evolutionProgress": 1 },
  { "id": 2, "pet_name": "Gaétane", "isAlive": false, "evolutionStage": 1, "evolutionProgress": 0.4 },
  { "id": 3, "pet_name": "Yáo", "isAlive": true, "evolutionStage": 2, "evolutionProgress": 1 },
  { "id": 4, "pet_name": "Véronique", "isAlive": false, "evolutionStage": 0, "evolutionProgress": 1 },
]

exports.getPets = async (req, res) => {
  console.log("GET PETS");

  const data = {
    length: 5,
    pets: pets
  }

  return response(res, 200, true, 'Success get pets', data)
}

exports.feedPet = async (req, res) => {
  console.log("FEED PETS");

  const { id, addBy } = req.body;

  console.log("id", "addBy");
  console.log(id, addBy);

  const pet = pets.find(pet => {
    return pet.id === id
  })

  console.log("AAAAAAAAAA", pet);

  if (pet.evolutionStage !== 2) {
    console.log("Evo stage is not 2");

    const result = pet.evolutionProgress + addBy;

    if (result === 1.00) {
      console.log("Result is 1");

      pet.evolutionStage += 1
      pet.evolutionProgress = 0.00
    } else {
      console.log("Result is not 1");

      pet.evolutionProgress = result;
    }
  } else {
    console.log("Evo stage 2");

    const result = pet.evolutionProgress + addBy;
    console.log(pet.evolutionProgress + " + " + addBy);
    console.log("RESULT IS", Math.round(result));

    if (result <= 1.1) {
      console.log("Result is not 1");

      pet.evolutionProgress = result;
    }
  }

  return response(res, 200, true, 'Success', pet);
}

exports.evolveChicken = async (req, res) => {

  const { id } = req.body;

  const pet = pets.find(pet => {
    return pet.id === id
  });

  if (pet.evolutionStage != 2) {
    pet.evolutionStage += 1;
    pet.evolutionProgress = 0.0;
  }

  return response(res, 200, true, 'Success', pet);
}

exports.crackEgg = async (req, res) => {

  const { id } = req.body;

  const pet = pets.find(pet => {
    return pet.id === id
  });

  if (pet.evolutionStage != 2) {
    pet.evolutionStage = 1;
    pet.evolutionProgress = 0.0;
  }

  return response(res, 200, true, 'Success', pet);
}

exports.feeding = async (req, res) => {
  const { id_pets, isFeed, typeOfFeed } = req.body;
  const getPet = await petsModel.getPetId({});

}

exports.siclusPets = async (data) => {
  const getAllPets = await petsModel.getAllPets(data);
  console.log(getAllPets, 'INI HASIL AMBIL SEMUA PETS');
}
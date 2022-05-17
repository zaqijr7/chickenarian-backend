const petsModel = require('../models/pets');
const response = require('../helpers/response');
<<<<<<< HEAD
const dateNow = require('../helpers/dateNowFormater');

exports.feeding = async (req, res) => {
  const { id_pet, isFeed, typeOfFeed } = req.body;
  console.assert(req.body)
  const getPet = await petsModel.getPetId({id_pet});
  const date1 = new Date(getPet[0].is_feed_today);
  const date2 = new Date();
  //get different hours from two date time
  let hours = Math.abs(date1 - date2) / 36e5;
  console.log(hours, "hours");
  // if (hours < 24) return response(res, 400, true, "Your pet has been fed");
  console.log(dateNow);
  const feding = await petsModel.editPetsByCondition({is_feed_today: dateNow}, id_pet);
  if (getPet[0].evo_bar !== 5) {
    await petsModel.editPetsByCondition({evo_bar: evo_bar++}, id_pet);
  } else {
    await petsModel.editPetsByCondition({evo_bar: 0}, id_pet);
    await petsModel.editPetsByCondition({})
  }
  console.log(feding);
  
=======

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

>>>>>>> 9587a73475334d49602237b8c94118a4bc309fa1
}

exports.siclusPets = async (data) => {
  const getAllPets = await petsModel.getAllPets(data);
  for (let index = 0; index < getAllPets.length; index++) {
    // console.log(getAllPets[index]);
    await petsModel.editPetsByCondition({is_dead: 1}, getAllPets[index].id_pet)
  }
  // console.log(getAllPets, 'INI HASIL AMBIL SEMUA PETS');
}
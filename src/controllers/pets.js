const petsModel = require('../models/pets');
const response = require('../helpers/response');
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
  
}

exports.siclusPets = async (data) => {
  const getAllPets = await petsModel.getAllPets(data);
  for (let index = 0; index < getAllPets.length; index++) {
    // console.log(getAllPets[index]);
    await petsModel.editPetsByCondition({is_dead: 1}, getAllPets[index].id_pet)
  }
  // console.log(getAllPets, 'INI HASIL AMBIL SEMUA PETS');
}
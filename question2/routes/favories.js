const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/favories.json');
const jsonDbPathUser = path.join(__dirname, '/../data/users.json');
const jsonDbPathLieu = path.join(__dirname, '/../data/travels.json');

// Create a favoris to be added to the menu.
router.post('/', (req, res) => {
  const idUser = req?.body?.idUser?.length !== 0 ? req.body.idUser : undefined;
  const idLieu = req?.body?.idLieu?.length !== 0 ? req.body.idLieu : undefined;
  if (!idUser || !idLieu) return res.sendStatus(400); // error code '400 Bad request'

  if (!retrouverUser(idUser) || !retrouverLieu(idLieu) || favorieExiste(idUser, idLieu)) {
    console.log('problème avec les entrées');
    return res.sendStatus(400);
  }
  console.log('passer tout test');

  const travels = parse(jsonDbPath);
  const newTravel = {
    id: getNextId(),
    idUser,
    idLieu,
  };

  travels.push(newTravel);

  serialize(jsonDbPath, travels);

  return res.json(newTravel.id);
});

function retrouverUser(IdIn) {
  const users = parse(jsonDbPathUser);
  const IdInNumber = Number(IdIn);
  const indexOfUserFound = users.findIndex((user) => user.id === IdInNumber);
  if (indexOfUserFound < 0) return false;
  console.log('user existe');
  return true;
}

function retrouverLieu(IdIn) {
  console.log('CHECK LIEU');
  const lieux = parse(jsonDbPathLieu);
  // console.log(lieux);
  // console.log(IdIn);
  const indexOfLieuFound = lieux.findIndex((lieu) => lieu.id === IdIn);
  console.log(indexOfLieuFound);
  if (indexOfLieuFound === -1) return false;
  console.log('lieu existe');
  return true;
}
function favorieExiste(idUserIn, idLieuIn) {
  const favories = parse(jsonDbPath);
  // eslint-disable-next-line max-len
  const indexOfFavoriFound = favories.findIndex((favorie) => favorie.idUser === idUserIn && favorie.idLieu === idLieuIn);
  if (indexOfFavoriFound < 0) return false;
  console.log('favoris existe, pas bon !');
  return true;
}

function getNextId() {
  const travels = parse(jsonDbPath);
  const lastItemIndex = travels?.length !== 0 ? travels.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = travels[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = router;

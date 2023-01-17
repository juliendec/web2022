const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');

function ajouterUtilisateur(nomUtilisateur, emailUtilisateur) {
  const userfound = retrouverAdresseMail(emailUtilisateur);
  if (userfound) return undefined;

  const toutLieuVacance = parse(jsonDbPath);
  const newUsers = {
    id: getNextId(),
    nom: nomUtilisateur,
    mail: emailUtilisateur,
  };
  toutLieuVacance.push(newUsers);
  serialize(jsonDbPath, toutLieuVacance);
  return newUsers.id;
}

function retrouverAdresseMail(adresseMail) {
  const users = parse(jsonDbPath);
  const indexOfUserFound = users.findIndex((user) => user.mail === adresseMail);
  if (indexOfUserFound < 0) return undefined;
  return users[indexOfUserFound];
}

function getNextId() {
  const users = parse(jsonDbPath);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  ajouterUtilisateur,
};

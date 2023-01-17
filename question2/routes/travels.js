const express = require('express');
const path = require('node:path');
const test = require('../node_modules/uuid');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/travels.json');

// Create a travel to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'
  const travels = parse(jsonDbPath);
  const newTravel = {
    id: test.v4(),
    title,
    content,
  };

  travels.push(newTravel);

  serialize(jsonDbPath, travels);

  return res.json(newTravel.id);
});

/*
function getNextId() {
  const travels = parse(jsonDbPath);
  const lastItemIndex = travels?.length !== 0 ? travels.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = travels[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
} */

module.exports = router;

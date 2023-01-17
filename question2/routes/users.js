const express = require('express');
const { ajouterUtilisateur } = require('../models/users');

const router = express.Router();

/* POST users listing. */
router.post('/register', (req, res) => {
  const nom = req?.body?.nom?.length !== 0 ? req.body.nom : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

  if (!email || !nom) return res.sendStatus(400); // 400 Bad Request

  const user = ajouterUtilisateur(nom, email);

  if (!user) return res.sendStatus(409); // 409 Conflict

  return res.json(user);
});

module.exports = router;

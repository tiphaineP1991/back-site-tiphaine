const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.DOMAIN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const Form = require("../Models/Form");

// --------------CREATE-----------------

router.post("/form/create", async (req, res) => {
  try {
    const newForm = await new Form({
      name: req.body.name,
      mail: req.body.mail,
      message: req.body.message,
    });
    newForm.save();
    res.json(newForm);
    mg.messages().send({
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: "tiphaine.pellet@essec.edu",
      subject: "Demande de renseignements de" + newForm.name,
      text:
        "Bonjour Tiphaine, vous avez reçu un nouveau message de la part de " +
        newForm.name +
        "mail: " +
        newForm.mail +
        "Message :" +
        newForm.message,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

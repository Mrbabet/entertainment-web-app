const express = require("express");
const router = express.Router();
const tmdbController = require("../controllers/tmdbController");

router.post("/", tmdbController.handleLogin);

module.exports = router;

const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.post(
  "/test-api",
  apiController.testApi
);

module.exports = router;
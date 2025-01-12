const express = require("express");
const router = express.Router();
const { handleFormSubmission } = require("../controllers/formController");

router.post("/", handleFormSubmission);

module.exports = router;

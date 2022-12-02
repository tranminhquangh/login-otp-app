const express = require("express");
const {
  createNewAccessCode,
  validateAccessCode,
} = require("../controllers/login-controller");
const router = express.Router();

router.post("/login", createNewAccessCode);
router.post("/otp", validateAccessCode);

module.exports = {
  routes: router,
};

const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

const ruter = express.Router();

ruter.get("/", usersController.getUsers);

ruter.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],

  usersController.signup
);

ruter.post("/login", usersController.login);

module.exports = ruter;

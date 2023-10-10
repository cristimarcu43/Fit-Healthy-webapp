const express = require("express");
const { check } = require("express-validator");

const postariControllers = require("../controllers/postari-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const ruter = express.Router();

ruter.get("/:postareid", postariControllers.getPostariById);

ruter.get("/user/:uid", postariControllers.getPostariByUserId);

ruter.use(checkAuth);

ruter.post(
  "/",
  fileUpload.single("image"),
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  postariControllers.createPost
);

ruter.patch(
  "/:postareid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  postariControllers.updatePost
);

ruter.delete("/:postareid", postariControllers.deletePost);

module.exports = ruter;

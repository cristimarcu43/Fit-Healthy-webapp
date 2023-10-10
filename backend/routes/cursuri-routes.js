const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const cursuriController = require("../controllers/cursuri-controllers");

const ruter = express.Router();

ruter.get("/", cursuriController.getCursuri);

ruter.post(
  "/createcurs",
  fileUpload.single("image"),
  cursuriController.createCurs
);

ruter.patch("/updatecurs", cursuriController.updateCurs);

ruter.post("/addcomment", cursuriController.addComment);
ruter.post("/addlike", cursuriController.addLike);
ruter.post("/deletelike", cursuriController.deleteLike);

ruter.post("/stergecomentarii", cursuriController.stergeComentarii);

ruter.get("/:cursId", cursuriController.getCursuriById);

module.exports = ruter;

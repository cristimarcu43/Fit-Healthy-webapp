const { validationResult } = require("express-validator");

const fs = require("fs");

const mongoose = require("mongoose");

const HttpError = require("../models/https-error");
//const { post } = require("../routes/postari-routes");
const Postare = require("../models/postare");
const Utilizator = require("../models/utilizator");

const getPostariById = async (req, res, next) => {
  const postId = req.params.postareid; // {postareid: 'postare1'}

  let postare;
  try {
    postare = await Postare.findById(postId);
  } catch (err) {
    const error = new HttpError("Nu s-a putut gasi postarea!", 500);

    return next(error);
  }

  if (!postare) {
    const error = new HttpError(
      "Postare nu a fost gasita pentru id-ul user-ului specificat.",
      404
    );
    return next(error);
  }
  res.json({ postare: postare.toObject({ getters: true }) });
};

// function getPlaceById() {}
//const getPlaceById = function() {}

const getPostariByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let postari;
  try {
    postari = await Postare.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Failed", 500);
    return next(error);
  }

  if (!postari || postari.length === 0) {
    return next(
      new HttpError(
        "Postarile nu au fost gasite pentru id-ul user-ului specificat",
        404
      )
    );
  }
  res.json({
    postari: postari.map((postare) => postare.toObject({ getters: true })),
  });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Date invalide, va rog verificati toate campurile!",
      422
    );
  }

  const { title, description } = req.body; //destructor in loc de const title=req.body.title;
  const createdPost = new Postare({
    title,
    description,
    image: req.file.path,
    creator: req.userData.userId,
  });

  let utilizator;

  try {
    utilizator = await Utilizator.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creare postare nereusita!", 500);
    return next(error);
  }

  if (!utilizator) {
    const error = new HttpError(
      "Nu se poate gasi utilizatorul pentru acest id",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    utilizator.postari.push(createdPost);
    await utilizator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Crearea postarii nereusita.", 500);
    return next(error);
  }

  res.status(201).json({ postare: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Date invalide, va rog verificati toate campurile!",
      422
    );
  }

  const { title, description } = req.body;
  const postId = req.params.postareid;

  let postare;

  try {
    postare = await Postare.findById(postId);
  } catch (err) {
    const error = new HttpError("Nu se poate actualiza postarea!", 500);
    return next(error);
  }

  if (postare.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "Nu ti se poate permite a edita aceasta postare!",
      401
    );
    return next(error);
  }

  postare.title = title;
  postare.description = description;

  try {
    await postare.save();
  } catch (err) {
    const error = new HttpError("Nu se poate actualiza postarea", 500);

    return next(error);
  }

  res.status(200).json({ post: postare.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const postId = req.params.postareid;

  let postare;

  try {
    postare = await Postare.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError("Nu s-a putut sterge postarea! 1", 500);
    return next(error);
  }

  if (!postare) {
    const error = new HttpError(
      "Postarea nu a fost gasita pentru acest id",
      404
    );
    return next(error);
  }

  if (postare.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "Nu ti se poate permite a sterge aceasta postare!",
      401
    );
    return next(error);
  }

  const imagePath = postare.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await postare.deleteOne({ session: sess });
    postare.creator.postari.pull(postare);
    await postare.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Nu s-a putut sterge postarea! 2", 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "S-a sters postarea." });
};

exports.getPostariById = getPostariById;
exports.getPostariByUserId = getPostariByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

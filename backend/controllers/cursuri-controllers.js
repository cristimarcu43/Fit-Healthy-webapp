const { validationResult } = require("express-validator");

const fs = require("fs");

const HttpError = require("../models/https-error");

// Cursuri folosind schema
const Curs = require("../models/curs");

const getCursuri = async (req, res, next) => {
  let cursuri;
  try {
    cursuri = await Curs.find();
  } catch (err) {
    const error = new HttpError("Nu s-au gasit cursuri", 500);
    return next(error);
  }

  res.json({
    cursuri: cursuri.map((curs) => curs.toObject({ getters: true })),
  });
};

const createCurs = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Date invalide, va rog verificati toate campurile!",
      422
    );
  }

  const { titlu, descriere } = req.body;

  const createdCurs = new Curs({
    titlu,
    descriere,
    image: req.file.path,
    comentarii: [],
    likes: [],
  });

  try {
    await createdCurs.save();
  } catch {
    const error = new HttpError("Crearea postarii nereusita.", 500);
    return next(error);
  }

  res.status(201).json({ cursuri: createdCurs });

  // res.status(201).json({ message: "succes" });
};

const getCursuriById = async (req, res, next) => {
  const cursId = req.params.cursId;

  let curs;
  try {
    curs = await Curs.findById(cursId);
  } catch (err) {
    const error = new HttpError("Nu s-a putut gasi cursul!", 500);
    return next(error);
  }

  if (!curs) {
    const error = new HttpError(
      "Cursul nu a fost gasit pentru id-ul speicificat",
      404
    );
    return next(error);
  }
  res.json({ curs: curs.toObject({ getters: true }) });
};

const updateCurs = async (req, res, next) => {
  const id = req.body.id;
  const descriere = req.body.descriere;

  let updateDescriere;

  try {
    updateDescriere = await Curs.updateOne(
      { _id: id },
      { descriere: descriere }
    );
    res.status(200).json({ message: descriere });
  } catch (err) {
    const error = new HttpError("Nu se poata actualiza descrierea!", 500);
    return next(error);
  }
};

const addComment = async (req, res, next) => {
  const id = req.body.id;
  const comentariu = req.body.comentariu;
  const nume = req.body.nume;
  const cursulMeu = await Curs.findOne({ _id: id });
  var cursuriCurente = cursulMeu.comentarii;
  cursuriCurente.push({
    nume: nume,
    comentariu: comentariu,
    data: new Date(),
  });
  const result = await Curs.updateOne(
    { _id: id },
    { comentarii: cursuriCurente }
  );
  res.status(200).json({
    message: result,
  });
};

const stergeComentarii = async (req, res, next) => {
  const { cursId, comentarii } = req.body;

  try {
    // Găsește cursul în baza de date folosind ID-ul
    const curs = await Curs.findById(cursId);

    if (!curs) {
      return res.status(404).json({ message: "Cursul nu a fost găsit." });
    }

    // Actualizează array-ul de comentarii cu cel primit în cerere
    curs.comentarii = comentarii;

    // Salvează cursul actualizat în baza de date
    await curs.save();

    return res
      .status(200)
      .json({ message: "Comentariile au fost actualizate cu succes." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "A apărut o eroare la actualizarea comentariilor." });
  }
};

const addLike = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const cursulMeu = await Curs.findOne({ _id: id });
  var cursuriCurente = cursulMeu.likes;
  cursuriCurente.push(userId);
  const result = await Curs.updateOne({ _id: id }, { likes: cursuriCurente });
  res.status(200).json({
    message: result,
  });
};

const deleteLike = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  console.log(userId);
  const cursulMeu = await Curs.findOne({ _id: id });
  var cursuriCurente = cursulMeu.likes;
  const index = cursuriCurente.indexOf(userId);
  console.log(index);
  console.log(cursuriCurente);
  const x = cursuriCurente.splice(index, 1);
  console.log(x);
  const result = await Curs.updateOne({ _id: id }, { likes: cursuriCurente });
  res.status(200).json({
    message: result,
  });
};

exports.getCursuri = getCursuri;
exports.getCursuriById = getCursuriById;
exports.createCurs = createCurs;
exports.updateCurs = updateCurs;
exports.addComment = addComment;
exports.addLike = addLike;
exports.deleteLike = deleteLike;
exports.stergeComentarii = stergeComentarii;

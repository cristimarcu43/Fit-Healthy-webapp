const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/https-error");

const Utilizator = require("../models/utilizator");

const getUsers = async (req, res, next) => {
  let utilizatori;
  try {
    utilizatori = await Utilizator.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Nu s-au gasit utilizatori", 500);
    return next(error);
  }
  res.json({
    utilizatori: utilizatori.map((utilizator) =>
      utilizator.toObject({ getters: true })
    ),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Date invalide, va rog verificati toate campurile!", 422)
    );
  }

  const { name, email, password } = req.body;

  let existentUtilizator;
  try {
    existentUtilizator = await Utilizator.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Inregistrare esuata, incearca din nou!", 500);

    return next(error);
  }

  if (existentUtilizator) {
    const error = new HttpError(
      "Exista deja un utilizator creat pe acest email",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Nu se poate crea utilizatorul.", 500);
    return next(error);
  }

  const createdUtilizator = new Utilizator({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    postari: [],
  });

  try {
    await createdUtilizator.save();
  } catch (err) {
    const error = new HttpError("Crearea contului nereusita.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUtilizator.id,
        email: createdUtilizator.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Crearea contului nereusita.", 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUtilizator.id,
    email: createdUtilizator.email,
    rol: createdUtilizator.rol,
    name: createdUtilizator.name,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existentUtilizator;
  try {
    existentUtilizator = await Utilizator.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login esuat, incearca din nou!", 500);

    return next(error);
  }

  if (!existentUtilizator) {
    const error = new HttpError("Date invalide, nu va puteti loga.", 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      password,
      existentUtilizator.password
    );
  } catch (err) {
    const error = new HttpError(
      "Credentialele nu se potrivesc, incearca din nou.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Date invalide, nu va puteti loga.", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existentUtilizator.id,
        email: existentUtilizator.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("logarea contului nereusita", 500);
    return next(error);
  }

  res.json({
    userId: existentUtilizator.id,
    email: existentUtilizator.email,
    rol: existentUtilizator.rol,
    name: existentUtilizator.name,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

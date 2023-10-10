const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const monogoose = require("mongoose");

const postariRoutes = require("./routes/postari-routes");
const usersRoutes = require("./routes/users-routes");
const cursuriRoutes = require("./routes/cursuri-routes");

const HttpError = require("./models/https-error");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/cursuri", cursuriRoutes);

app.use("/api/postari", postariRoutes); // => /api/postari/...

app.use("/api/utilizatori", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Nu se poate gasi ruta", 404);
  throw error;
});

app.use((error, req, res, next) => {
  // Stergem imaginea adaugata din server-ul nostru
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500); //status 500 indica daca ceva e gresit pe sv
  res.json({ message: error.message || "S-a gasit o eroare!" });
});

monogoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8yloagt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

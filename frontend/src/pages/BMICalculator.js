import React, { useState } from "react";

const BMICalculator = () => {
  const [greutate, setGreutate] = useState(0);
  const [inaltime, setInaltime] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const parsedGreutate = parseFloat(greutate);
  const parsedInaltime = parseFloat(inaltime) / 100; // convertim din cm in m

  const calculateBMI = (event) => {
    event.preventDefault();

    if (parsedGreutate === 0 || parsedInaltime === 0) {
      alert("Va rog introduceti o greutate si inaltime valida!");
    } else {
      let bmi = parsedGreutate / (parsedInaltime * parsedInaltime);
      console.log(bmi);
      setBmi(bmi.toFixed(1));

      //logica pentru mesaj!
      if (bmi < 18.5) {
        setMessage("Esti subponderal/a!");
      } else if (bmi >= 18.5 && bmi <= 25) {
        setMessage("Bravo, esti normal/a!");
      } else {
        setMessage("Esti supraponderal/a!");
      }
    }
  };

  const resetInputs = () => {
    setGreutate(0);
    setInaltime(0);
    setBmi("");
    setMessage("");
  };

  let imgSrc;

  if (bmi < 1) {
    imgSrc = null;
  } else if (bmi < 18.5) {
    imgSrc = require("../images/Sad-Face-Emoji.png");
  } else if (bmi >= 18.5 && bmi <= 25) {
    imgSrc = require("../images/happy_face.png");
  } else {
    imgSrc = require("../images/Sad-Face-Emoji.png");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
      <form
        onSubmit={calculateBMI}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label className="text-gray-800 mb-1">Inaltime (cm)</label>
          <input
            value={inaltime}
            onChange={(event) => setInaltime(event.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-800 mb-1">Greutate (kg)</label>
          <input
            value={greutate}
            onChange={(event) => setGreutate(event.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Calculeaza
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="button"
            onClick={resetInputs}
          >
            Sterge
          </button>
        </div>
      </form>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">
          Body mass index-ul tau este: {bmi}
        </h3>
        <p>{message}</p>
      </div>

      <div className="mt-4">
        <img
          src={imgSrc}
          alt="BMI"
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default BMICalculator;

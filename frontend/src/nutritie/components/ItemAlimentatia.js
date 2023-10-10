import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const ItemAlimentatia = (props) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const openMenuHandler = (meals) => {
    setShowMenuModal(true);
    setSelectedMeals(meals);
  };

  const closeMenuHandler = () => {
    setShowMenuModal(false);
    setSelectedMeals([]);
  };

  const generateMenuList = (meals) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Meniu</h2>
        <ul>
          {meals.map((meal, index) => (
            <li key={index}>
              <h3>{meal.day}</h3>
              <ul>
                {meal.menuItems.map((menuItem, mealIndex) => (
                  <li key={mealIndex}>{menuItem}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Definim meniurile pentru fiecare element de masă
  const mealsData = [
    {
      day: "Ziua 1",
      menuItems: [
        "Mic dejun: Omeletă cu spanac și fulgi de ovăz",
        "Prânz: Piept de pui la grătar cu quinoa",
        "Cină: Somon la cuptor cu sparanghel",
      ],
    },
    {
      day: "Ziua 2",
      menuItems: [
        "Mic dejun: Smoothie cu fructe și iaurt",
        "Prânz: Salată de ton cu legume",
        "Cină: Tofu cu broccoli și orez brun",
      ],
    },
    // Adăugați mai multe zile și alimente pentru fiecare zi aici
  ];

  return (
    <React.Fragment>
      <Modal
        show={showMenuModal}
        onCancel={closeMenuHandler}
        header={props.name}
        footer={<Button onClick={closeMenuHandler}>Inchide</Button>}
      >
        <div className="bg-gray-100 h-96 w-full p-4">
          {generateMenuList(selectedMeals)}
        </div>
      </Modal>

      <div className="mb-8">
        <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 h-72 w-72 bg-white rounded-lg p-2">
          <div className="">
            <img
              className="h-96 object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
              src={props.image}
              alt={props.name}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
            <h2 className="text-3xl font-bold text-white">{props.name}</h2>
            <h3 className="text-2xl text-white">Accesari: {props.accesari} </h3>
            <p className="text-lg italic text-white mb-3">{props.descriere}</p>
            <Button inverse onClick={() => openMenuHandler(mealsData)}>
              Vezi Meniu
            </Button>
          </div>
        </div>
        <div className="mt-4">
          {/* Sectiunea de comentarii */}
          {/* Here, you can add your comment section */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ItemAlimentatia;

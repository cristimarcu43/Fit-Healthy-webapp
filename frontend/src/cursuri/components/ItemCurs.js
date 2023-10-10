import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AutentificareContext } from "../../shared/context/conect-context";

const ItemCurs = (props) => {
  const autentificare = useContext(AutentificareContext);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mb-4">
      <img
        className="w-full h-48 object-cover transform scale-105 transition-transform duration-300 hover:scale-110"
        src={props.image}
        alt={props.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-800">
          {props.titlu}
        </div>
        <p className="text-gray-700 text-base">{props.descriere}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Aprecieri: {props.likes}
        </span>
        {autentificare.isLoggedIn && (
          <Link to={`/cursuri/${props.cursId}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-full">
              {props.titlu}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemCurs;

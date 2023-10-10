import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AutentificareContext } from "../../../shared/context/conect-context";

const ItemSchelet = (props) => {
  const autentificare = useContext(AutentificareContext);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mb-4">
      <img
        className="w-full h-48 object-cover transform scale-105 transition-transform duration-300 hover:scale-110"
        src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
        alt={props.titlu}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-800">
          {props.titlu}
        </div>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Aprecieri: {props.likes.length}
        </span>
        {autentificare.isLoggedIn && (
          <Link to={`/curs/${props.id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-full">
              Vezi CURSUL
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemSchelet;

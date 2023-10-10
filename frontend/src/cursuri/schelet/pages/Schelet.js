import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AutentificareContext } from "../../../shared/context/conect-context";

const Schelet = () => {
  const logare = useContext(AutentificareContext);
  return (
    <>
      {logare.isLoggedIn && logare.rol === "ADMIN" && (
        <Link to="/cursuri/creare">
          <div className="px-40 mb-10">
            <button className="bg-green-600 text-white rounded-md px-2 py-1">
              Adauga CURS
            </button>
          </div>
        </Link>
      )}
    </>
  );
};

export default Schelet;

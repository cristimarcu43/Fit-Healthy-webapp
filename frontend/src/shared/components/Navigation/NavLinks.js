import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { AutentificareContext } from "../../context/conect-context";

const NavLinks = () => {
  const logare = useContext(AutentificareContext);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ">
      {logare.isLoggedIn && logare.rol === "ADMIN" && (
        <h2 className=" text-3xl font-bold text-red-700 mr-4 ">CONT ADMIN</h2>
      )}

      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        <Link to="/">Fit&Healthy</Link>
      </h1>

      <ul className="flex items-center">
        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <Link to="/">Acasa</Link>
        </li>

        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <Link to="/bmiCalculator">BMICalculator</Link>
        </li>

        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <Link to="/alimentatie">Alimentatie</Link>
        </li>

        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <Link to="/cursuri">Cursuri</Link>
        </li>

        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <Link to="/postari">Comunitate</Link>
        </li>

        {/* {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <Link to={`/${logare.userId}/cursuri`}>Cursurile mele</Link>
          </li>
        )} */}

        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <Link to={`/${logare.userId}/postari`}>Postarile mele</Link>
          </li>
        )}

        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <Link to="/postari/creare">Adauga postare</Link>
          </li>
        )}

        {!logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <Link to="/autentificare">Autentificare</Link>
          </li>
        )}

        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <button onClick={logare.dezautentificare}>Deconectare</button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default NavLinks;

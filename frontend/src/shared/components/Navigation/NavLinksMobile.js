import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AutentificareContext } from "../../context/conect-context";

const NavLinksMobile = () => {
  const logare = useContext(AutentificareContext);
  return (
    <div className="w-full flex items-center justify-between md:px-10 px-7 md:justify-between transition ">
      <ul className="flex flex-col items-center mt-10">
        <li className="p-4 md:ml-8 hover:text-green-700 duration-500">
          <NavLink to="/">Acasa</NavLink>
        </li>
        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <NavLink to="/bmiCalculator">BMICalculator</NavLink>
        </li>
        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
          <NavLink to="/cursuri">Cursuri</NavLink>
        </li>
        <li className="p-4 md:ml-8 hover:text-green-700 duration-500 ">
          <NavLink to="/postari">Postari</NavLink>
        </li>

        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500">
            <NavLink to="/u1/cursuri">Cursurile mele</NavLink>
          </li>
        )}
        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 ">
            <NavLink to="/u1/postari">Postarile mele</NavLink>
          </li>
        )}
        {logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 ">
            <NavLink to="/postari/creare">Adauga postare</NavLink>
          </li>
        )}
        {!logare.isLoggedIn && (
          <li className="p-4 md:ml-8 hover:text-green-700 duration-500 hidden md:block">
            <NavLink to="/autentificare">Autentificare</NavLink>
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
export default NavLinksMobile;

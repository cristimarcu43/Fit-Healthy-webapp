import React, { useContext } from "react";
import { useTypingEffect } from "../shared/hooks/typing-effect";
import { Link } from "react-router-dom";
import { AutentificareContext } from "../shared/context/conect-context";

const Acasa = () => {
  const logare = useContext(AutentificareContext);
  const text = useTypingEffect("Fit&Healthy!", 70);

  return (
    <div>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">Tu esti cel care decide!</p>
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold md:py-6">
          Imbunatateste-ti stilul de viata cu ajutorul aplicatiei{" "}
          <span className="text-[#00df9a]">{text}</span>
        </h1>
        {!logare.isLoggedIn && (
          <div>
            <p className="font-semibold">
              Pentru a dispune de toate functionalitatile aplicatiei
              autentifica-te acum!
            </p>

            <Link to="/autentificare">
              <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                Autentificare
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Acasa;

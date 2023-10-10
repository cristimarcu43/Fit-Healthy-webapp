import React from "react";
import { Link } from "react-router-dom";
import ListaAlimentatie from "../components/ListaAlimentatie";
import VectorAlimentatie from "../components/VectorAlimentatie";

const Alimentatie = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold mb-4">
          In caz ca nu v-ati calculat Indicele de masa corporal
        </p>
        <Link to="/bmicalculator">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Mergi catre BMICalculator
          </button>
        </Link>
        <ListaAlimentatie items={VectorAlimentatie} />
      </div>
    </React.Fragment>
  );
};

export default Alimentatie;

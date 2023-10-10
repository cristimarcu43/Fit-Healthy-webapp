import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import VectorCursuri from "../components/VectorCursuri";
import ListaCursuri from "../components/ListaCursuri";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import CursNouModal from "../components/CursNouModal";
import ListaSchelet from "../schelet/components/ListaSchelet";
import Schelet from "../schelet/pages/Schelet";

const Cursuri = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedCursuri, setLoadedCursuri] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCursuri = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/cursuri`
        );

        setLoadedCursuri(responseData.cursuri);
      } catch (err) {}
    };
    fetchCursuri();
  }, [sendRequest]);

  //CRISTI
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}

      <div>
        <Schelet />
      </div>
      {!isLoading && loadedCursuri && <ListaSchelet items={loadedCursuri} />}
    </React.Fragment>
  );

  //COSMIN

  // return (
  //   <React.Fragment>
  //     <CursNouModal open={open} setOpen={setOpen} />
  //     <div className="px-40 mb-10">
  //       <button
  //         onClick={(e) => {
  //           e.preventDefault();
  //           setOpen(true);
  //         }}
  //         type="button"
  //         className="bg-green-600 text-white rounded-md px-2 py-1"
  //       >
  //         Adauga curs
  //       </button>
  //     </div>

  //     <ErrorModal error={error} onClear={clearError} />
  //     {isLoading && (
  //       <div>
  //         <LoadingSpinner />
  //       </div>
  //     )}
  //     {!isLoading && loadedCursuri && <ListaCursuri items={loadedCursuri} />}
  //   </React.Fragment>
  // );
};

export default Cursuri;

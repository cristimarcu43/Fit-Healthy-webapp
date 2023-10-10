import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../shared/components/FormElements/Input";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";

import { useForm } from "../../../shared/hooks/form-hook";
// import { AutentificareContext } from "../../../shared/context/conect-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ImageUpload from "../../../shared/components/FormElements/imageUpload";

const InputSchelet = () => {
  // const logare = useContext(AutentificareContext);

  // const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      titlu: {
        value: "",
        isValid: false,
      },
      descriere: {
        value: "",
        isValid: false,
      },

      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const CreareSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    try {
      const formData = new FormData();
      formData.append("titlu", formState.inputs.titlu.value);
      formData.append("descriere", formState.inputs.descriere.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_ASSET_URL + `/api/cursuri/createcurs `,
        "POST",
        formData
      );
      navigate("/cursuri");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-4">CREARE POSTARE</h2>
          <hr className="my-4" />
          <form onSubmit={CreareSubmitHandler}>
            <Input
              element="input"
              id="titlu"
              type="text"
              label="Titlu Curs"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Va rog introduceti un titlu valid."
              onInput={inputHandler}
            />

            <Input
              id="descriere"
              element="textarea"
              label="Descriere"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Va rog introduceti o descriere valida (cel putin 5 caractere)."
              onInput={inputHandler}
            />

            <ImageUpload
              id="image"
              errorText="Va rog folositi o imagine"
              onInput={inputHandler}
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-full"
              type="submit"
            >
              PUBLICA
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputSchelet;

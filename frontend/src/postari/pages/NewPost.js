import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Adaugă importul pentru Axios

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import "./PostForm.css";

import { AutentificareContext } from "../../shared/context/conect-context";

import ImageUpload from "../../shared/components/FormElements/imageUpload";

const NewPost = () => {
  const autentificare = useContext(AutentificareContext);
  const [isLoading, setIsLoading] = useState(false); // Folosește useState pentru gestionarea încărcării
  const [error, setError] = useState(null); // Folosește useState pentru gestionarea erorilor

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const PostSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Setează isLoading la true înainte de cerere

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);

      await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/postari`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + autentificare.token,
          },
        }
      );

      setIsLoading(false); // Setează isLoading la false după ce cererea este completă
      navigate("/" + autentificare.userId + "/postari");
    } catch (err) {
      setError(err.message || "A apărut o eroare.");
      setIsLoading(false); // Setează isLoading la false în caz de eroare
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="flex justify-center items-center h-screen">
        {isLoading && <LoadingSpinner asOverlay />}
        <form
          className="w-1/2 p-4 bg-white shadow-md rounded-md"
          onSubmit={PostSubmitHandler}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Titlu"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Va rog introduceti un titlu valid."
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Descriere"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Va rog introduceti o descriere valida (cel putin 5 caractere)."
            onInput={inputHandler}
          />

          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Va rog folositi o imagine"
          />
          <Button type="submit" disabled={!formState.isValid}>
            Adauga Postare
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewPost;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AutentificareContext } from "../../shared/context/conect-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/imageUpload";

const Autentificare = () => {
  const logare = useContext(AutentificareContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: {
              isValid: false,
            },
            image: {
              value: null,
              isValid: false,
            },
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const navigate = useNavigate();

  const AutentificareSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_ASSET_URL + `/api/utilizatori/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        logare.autentificare(
          responseData.userId,
          responseData.token,
          responseData.rol,
          responseData.name
        );
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_ASSET_URL + `/api/utilizatori/signup`,
          "POST",
          formData
        );

        logare.autentificare(
          responseData.userId,
          responseData.token,
          responseData.rol,
          responseData.name
        );
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-4"></h2>
          <hr className="my-4" />
          <form onSubmit={AutentificareSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="PLease enter a name."
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                id="image"
                onInput={inputHandler}
                errorText="Va rog folositi o imagine"
              />
            )}
            {/* {!isLoginMode} */}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              className="mb-4"
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
              className="mb-4"
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {isLoginMode ? "LOGARE" : "INREGISTRARE"}
            </Button>
          </form>
          <div className="mt-4">
            <Button inverse onClick={switchModeHandler}>
              Schimba catre {isLoginMode ? "INREGISTRARE" : "LOGARE"}
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Autentificare;

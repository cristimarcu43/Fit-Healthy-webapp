import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AutentificareContext } from "../../shared/context/conect-context";
//import "./PostForm.css";

const UpdatePost = () => {
  const autentificare = useContext(AutentificareContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();

  const postId = useParams().postId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_ASSET_URL + `/api/postari/${postId}`
        );
        setLoadedPost(responseData.postare);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, postId, setFormData]);

  const postUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_ASSET_URL + `/api/postari/${postId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + autentificare.token,
        }
      );

      navigate("/" + autentificare.userId + "/postari");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className=" mt-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPost && !error) {
    return (
      <div className="text-center text-black mt-4">
        <h2>Nu se poate gasi postarea!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPost && (
        <div className="flex justify-center items-center h-screen">
          <form
            className="w-1/2 p-4 bg-white shadow-md rounded-md"
            onSubmit={postUpdateSubmitHandler}
          >
            <Input
              id="title"
              element="input"
              type="text"
              label="Titlu"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Va rog introduceti un titlu valid."
              onInput={inputHandler}
              initialValue={loadedPost.title}
              initialValid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Descriere"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Va rog introduceti o descriere valida (cel putin 5 caractere)."
              onInput={inputHandler}
              initialValue={loadedPost.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE Post
            </Button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdatePost;

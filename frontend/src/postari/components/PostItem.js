import React, { useState, useContext } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AutentificareContext } from "../../shared/context/conect-context";
import { Link } from "react-router-dom";

const PostItem = (props) => {
  const autentificare = useContext(AutentificareContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const logare = useContext(AutentificareContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/postari/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + autentificare.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="STERGERE?"
        footer={
          <React.Fragment>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onClick={cancelDeleteHandler}
            >
              ANULEAZA
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 ml-2"
              onClick={confirmDeleteHandler}
            >
              STERGE
            </button>
          </React.Fragment>
        }
      >
        <p>Esti sigur ca vrei sa stergi aceasta postare?</p>
      </Modal>

      <li>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {isLoading && <LoadingSpinner asOverlay />}

          <img
            className="rounded-t-lg"
            src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.title}
          />

          <div className="p-5">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.title}
            </h2>
            {props.description ? (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.description}
              </p>
            ) : (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Fără descriere disponibilă.
              </p>
            )}

            <div>
              {logare.userId === props.creatorId && (
                <Link to={`/postari/${props.id}`}>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm">
                    EDIT
                  </button>
                </Link>
              )}
              {logare.userId === props.creatorId && (
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  onClick={showDeleteWarningHandler}
                >
                  DELETE
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default PostItem;

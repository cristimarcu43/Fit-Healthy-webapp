import React, { useEffect, useState } from "react";
import axios from "axios";
import ListaUtilizatori from "../components/ListaUtilizatori";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_ASSET_URL + `/api/utilizatori`
        );
        setLoadedUsers(response.data.utilizatori);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "A apărut o eroare.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const clearError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <ListaUtilizatori items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PostList from "../components/PostList";

const UserPosts = () => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_ASSET_URL + `/api/postari/user/${userId}`
        );
        setLoadedPosts(response.data.postari);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "A apărut o eroare.");
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  const clearError = () => {
    setError(null);
  };

  const postDeleteHandler = (deletedPostId) => {
    setLoadedPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedPosts.length > 0 && (
        <PostList items={loadedPosts} onDeletePost={postDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPosts;

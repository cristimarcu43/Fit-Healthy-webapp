import React from "react";
import { Link } from "react-router-dom";

const ItemUtilizator = (props) => {
  return (
    <li>
      <Link to={`/${props.id}/postari`}>
        <div className="flex flex-col items-center pb-10 mt-10">
          <img
            className="w-32 h-32 mb-3 rounded-full shadow-lg"
            src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.name}
          />

          <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.name}
          </h2>
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            {props.postCount} {props.postCount === 1 ? "Postare" : "Postari"}
          </h3>
        </div>
      </Link>
    </li>
  );
};

export default ItemUtilizator;

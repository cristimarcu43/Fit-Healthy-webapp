import React from "react";
import ItemUtilizator from "./ItemUtilizator";

const ListaUtilizatori = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-center text-3xl">Utilizatori negasiti.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 list-none">
      {props.items.map((user) => {
        return (
          <ItemUtilizator
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            postCount={user.postari.length}
          />
        );
      })}
    </div>
  );
};

export default ListaUtilizatori;

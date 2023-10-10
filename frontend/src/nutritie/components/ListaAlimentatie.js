import React from "react";
import ItemAlimentatia from "./ItemAlimentatia";

const ListaAlimentatie = (props) => {
  return (
    <div className="grid grid-cols-2 gap-8 p-8 justify-center">
      {props.items.map((alimente) => {
        return (
          <ItemAlimentatia
            key={alimente.id}
            id={alimente.id}
            name={alimente.name}
            image={alimente.imageUrl}
            descriere={alimente.descriere}
            accesari={alimente.accesari}
          />
        );
      })}
    </div>
  );
};

export default ListaAlimentatie;

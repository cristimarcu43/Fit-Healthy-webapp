import React from "react";
import ItemSchelet from "./ItemSchelet";

const ListaSchelet = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {props.items.map((curs) => {
        return (
          <ItemSchelet
            key={curs.id}
            id={curs.id}
            descriere={curs.descriere}
            titlu={curs.titlu}
            image={curs.image}
            likes={curs.likes}
          />
        );
      })}
    </div>
  );
};

export default ListaSchelet;

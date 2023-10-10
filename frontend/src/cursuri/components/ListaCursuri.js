import React from "react";
import ItemCurs from "./ItemCurs";

const ListaCursuri = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {props.items.map((curs) => {
        return (
          <ItemCurs
            key={curs.id}
            id={curs.id}
            titlu={curs.titlu}
            image={curs.image}
            descriere={curs.descriere}
            likes={curs.likes}
          />
        );
      })}
    </div>
  );
};

export default ListaCursuri;

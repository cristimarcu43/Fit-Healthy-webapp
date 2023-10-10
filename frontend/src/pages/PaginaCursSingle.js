import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AutentificareContext } from "../shared/context/conect-context";
import { toast } from "react-toastify";
import { UserIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import moment from "moment";

const PaginaCursSingle = (props) => {
  const [descriere, setDescriere] = useState("");
  const [newComm, setNewComm] = useState("");
  const [comentarii, setComentarii] = useState();
  const [aprecieri, setAprecieri] = useState();
  const [image, setImage] = useState();
  const { id } = useParams();

  const { rol, name, userId } = useContext(AutentificareContext);

  const getCurs = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/` + id
      );
      setDescriere(res.data.curs.descriere);
      return res;
    } catch (err) {
      console.log(err._message);
    }
  };
  useEffect(() => {
    getCurs().then((res) => {
      setComentarii(res.data.curs.comentarii);
      setAprecieri(res.data.curs.likes);
      setImage(res.data.curs.image);
    });
  }, []);

  const salvareCurs = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/updatecurs`,
        {
          id: id,
          descriere: descriere,
        }
      );
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const onSave = () => {
    salvareCurs().then((res) => {
      toast.success("Salvat cu succes!");
      console.log(res);
    });
  };

  const salveazaComm = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/addcomment`,
        {
          id: id,
          comentariu: newComm,
          nume: name,
        }
      );
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const stergeComentariu = (comentariuId) => {
    const comentariiActualizate = [...comentarii];
    const indexComentariu = comentariiActualizate.findIndex(
      (comm) => comm._id === comentariuId
    );

    if (indexComentariu !== -1) {
      comentariiActualizate.splice(indexComentariu, 1);
      setComentarii(comentariiActualizate);

      // Trimite array-ul actualizat către backend pentru actualizarea în baza de date
      axios
        .post(process.env.REACT_APP_BACKEND_URL + `/cursuri/stergecomentarii`, {
          cursId: id,
          comentarii: comentariiActualizate,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Comentariul a fost șters cu succes !");
          } else {
            toast.error(
              "A apărut o eroare la ștergerea comentariului în backend!"
            );
          }
        })
        .catch((error) => {
          toast.error(
            "A apărut o eroare la ștergerea comentariului în backend!"
          );
        });
    }
  };

  const adaugaLike = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/addlike`,
        {
          id: id,
          userId: userId,
        }
      );
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const stergeLike = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/deletelike`,
        {
          id: id,
          userId: userId,
        }
      );
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const onAddLike = () => {
    adaugaLike().then((res) => {
      if (res.status == 200) {
        toast.success("Apreciere salvata cu succes!");
        getCurs().then((res) => {
          setAprecieri(res.data.curs.likes);
          // setComentarii(res.data.curs.comentarii);
        });
      } else {
        toast.error("A aparut o eroare!");
      }
    });
  };

  const onDeleteLike = () => {
    stergeLike().then((res) => {
      if (res.status == 200) {
        toast.success("Apreciere stearsa cu succes!");
        getCurs().then((res) => {
          setAprecieri(res.data.curs.likes);
          // setComentarii(res.data.curs.comentarii);
        });
      } else {
        toast.error("A aparut o eroare!");
      }
    });
  };

  const onSaveComentariu = () => {
    salveazaComm().then((res) => {
      if (res.status == 200) {
        toast.success("Comentariu salvat cu succes!");
        getCurs().then((res) => {
          setComentarii(res.data.curs.comentarii);
          setNewComm("");
        });
      } else {
        toast.error("A aparut o eroare!");
      }
    });
  };

  const onDeleteComentariu = () => {
    stergeComentariu().then((res) => {
      if (res.status == 200) {
        toast.success("Comentariu sters cu succes!");
        getCurs().then((res) => {
          setComentarii(res.data.curs.comentarii);
          setNewComm("");
        });
      } else {
        toast.error("A aparut o eroare!");
      }
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="px-20 mt-10">
        <div className="mx-auto">
          <img
            className="mx-auto w-96 h-64"
            src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
            alt={props.titlu}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Incepe Transformarea Ta Acum!
            </h1>
          </div>
          <div>
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onAddLike();
                }}
                className={aprecieri?.includes(userId) ? "hidden" : ""}
              >
                <HandThumbUpIcon className="h-10 w-10" />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteLike();
                }}
                className={aprecieri?.includes(userId) ? "" : "hidden"}
              >
                <HandThumbUpIcon className="h-10 w-10 text-blue-700 fill-blue-700" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={(rol === "ADMIN" ? "hidden" : "") + " my-10"}>
            {descriere}
          </div>
          <div className={(rol !== "ADMIN" ? "hidden" : "") + " my-10"}>
            <div>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="descriere"
                  id="descriere"
                  rows={10}
                  value={descriere}
                  onChange={(e) => {
                    e.preventDefault();
                    setDescriere(e.target.value);
                  }}
                  className="pl-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onSave();
              }}
              className="mt-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salveaza
            </button>
          </div>
        </div>
        <div className="my-10">
          {comentarii?.map((comm) => {
            return (
              <>
                <div
                  key={comm._id}
                  className="flex space-x-4 text-sm text-gray-500"
                >
                  <div className="flex-none py-10">
                    <UserIcon className="h-8 w-8 rounded-full bg-gray-100" />
                  </div>
                  <div
                    className={classNames(
                      true ? "" : "border-t border-gray-200",
                      "py-10"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{comm.nume}</h3>
                      <p>{moment(comm.data).format("DD-MM-YYYY HH:mm")}</p>
                    </div>
                    <div
                      className="prose prose-sm mt-4 max-w-none text-gray-500"
                      dangerouslySetInnerHTML={{ __html: comm.comentariu }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      stergeComentariu(comm._id);
                    }}
                    className="text-red-700 self-end"
                  >
                    Sterge
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <div className="my-10">
          <div>
            <div>
              <p className="font-xl">Adauga un nou comentariu</p>
            </div>
            <div className="mt-2">
              <textarea
                type="text"
                name="descriere"
                id="descriere"
                rows={2}
                value={newComm}
                onChange={(e) => {
                  e.preventDefault();
                  setNewComm(e.target.value);
                }}
                className="pl-2 block w-full rounded-md border-2 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSaveComentariu();
            }}
            className="mt-10 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Salveaza comentariu
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginaCursSingle;

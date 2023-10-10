import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ImageUpload from "../../shared/components/FormElements/imageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import axios from "axios";

export default function CursNouModal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [titlu, setTitlu] = useState("");

  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const onSave = async () => {
    console.log(formState);
    try {
      var formData = new FormData();

      formData.append("titlu", titlu);
      formData.append("image", formState.inputs.image.value);
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/cursuri/createcurs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PlusCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Adauga curs nou
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Completeaza datele cursului
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <div>
                    <label
                      htmlFor="titlu"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Titlu curs
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="titlu"
                        id="titlu"
                        value={titlu}
                        onChange={(e) => {
                          setTitlu(e.target.value);
                        }}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <ImageUpload
                      id="image"
                      onInput={inputHandler}
                      errorText="Va rog folositi o imagine"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("da");
                      onSave();
                    }}
                  >
                    Salveaza
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Renunta
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

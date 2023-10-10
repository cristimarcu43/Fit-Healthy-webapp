import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // const Element = props.element === "textarea" ? "textarea" : "input";

  return (
    <div
      className={`mb-4 ${
        !inputState.isValid && inputState.isTouched ? "border-red-500" : ""
      }`}
    >
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-600"
      >
        {props.label}
      </label>
      {props.element === "input" ? (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className={`mt-1 p-2 border rounded-md w-full ${
            !inputState.isValid && inputState.isTouched
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:border-blue-500`}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className={`mt-1 p-2 border rounded-md w-full ${
            !inputState.isValid && inputState.isTouched
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:border-blue-500`}
        />
      )}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-500 text-xs mt-1">{props.errorText}</p>
      )}
    </div>

    // <div className={`mb-4 ${!inputState.isValid && "bg-red-100"}`}>
    //   <label htmlFor={props.id} className="block text-gray-700 font-bold mb-2">
    //     {props.label}
    //   </label>
    //   <Element
    //     id={props.id}
    //     placeholder={props.placeholder}
    //     onChange={changeHandler}
    //     value={inputState.value}
    //     className="w-full p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
    //     rows={props.rows || 3}
    //   />
    //   {!inputState.isValid && (
    //     <p className="text-red-500 text-sm">{props.errorText}</p>
    //   )}
    // </div>
  );
};

export default Input;

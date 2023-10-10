import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg w-6/12 p-4 shadow-lg">
        <h2 className="text-black">{props.header}</h2>

        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div>{props.children}</div>
          <footer className="p-2">{props.footer}</footer>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;

import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../UI/Modal.module.css";

const Backdrop = (props) => {
  // console.log(props);
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  const placeHolder = document.getElementById("overlay");
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, placeHolder)}
      {ReactDOM.createPortal(
        <Overlay> {props.children} </Overlay>,
        placeHolder
      )}
    </Fragment>
  );
};

export default Modal;

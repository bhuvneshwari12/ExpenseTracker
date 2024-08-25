import React ,{ Fragment } from 'react';
import classes from './Modal.module.css';



const BackDrop = props => {
    return <div className={classes.backdrop}  onClick={props.cartCloseHandler}/>    
}

const ModalOverlay= (props) =>{
    return (
    <div className={classes.modal}>
        <div className={classes.content}> {props.children} </div>
    </div>

    );
}

const Modal = (props) => {
    return (
      <Fragment>
        <BackDrop cartCloseHandler={props.cartCloseHandler}   />
        <ModalOverlay>{props.children}</ModalOverlay>
      </Fragment>
    );
};
export default Modal;
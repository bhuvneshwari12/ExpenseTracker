import React, { useContext, useRef } from 'react'
import Modal from './Modal'
import './Cart.css'
import { AuthContext } from '../Store/AuthContext'

const Cart = (props) => {
    let newPasswordRef=useRef()
    const authctx=useContext(AuthContext)

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log('hellooo')
        const enteredNewPassword=newPasswordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo',{
            method:'POST',
            body:JSON.stringify({idToken:authctx.token, password:enteredNewPassword,returnSecureToken:false}),
            headers : { 'Content-Type' : 'application/json'}
        })
        .then(res=> console.log(res))
    }

    return (
        <Modal cartCloseHandler={props.cartCloseHandler}>
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>

                <label>NewPassword:</label>
                <input type='text' ref={newPasswordRef} required/>

                <button type='submit' className='submitb'>Submit</button>
            </form>
        </Modal>
    )
}

export default Cart;

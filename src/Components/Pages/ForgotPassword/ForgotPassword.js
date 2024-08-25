import React, { useEffect, useRef } from 'react';
import './ForgotPassword.css'; // Import CSS file for styling

const ForgotPassword = () => {
    let emailRef=useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        const email=emailRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo',{
            method:'Post',
            body:JSON.stringify({requestType:'PASSWORD_RESET',email:email}),
            headers:{'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(data => {console.log(data) 
            alert('verification link send')
        })
        .catch(error => alert(error));
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h2 className="reset-password-heading">Enter the email to reset password:</h2>
                <input type="email" placeholder="Enter your email" ref={emailRef}required />
                <button type="submit" >Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

import React, { useContext, useRef, useState } from 'react';
import './AuthForm.css'; // Import CSS file for styling
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../Store/AuthContext';


const AuthForm = (props) => {
const [isLogin,setIsLogin]=useState(true);
const [isLoading,setIsLoading]=useState(false);
const history=useHistory()
const authctx=useContext(AuthContext);

let emailRef=useRef();
let passwordRef=useRef();
let confirmPasswordRef=useRef();

const handleSubmit=(event)=>{
    event.preventDefault();
    const enteredEmail=emailRef.current.value;
    const enteredPassword=passwordRef.current.value;
     
     if (!isLogin) {
        const enteredConfirmPassword = confirmPasswordRef.current.value;
        if (enteredPassword.trim() !== enteredConfirmPassword.trim()) {
          alert("Passwords don't match.");
          return;
        }
      }
      setIsLoading(true)
    let url;
    if(isLogin)
    {
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo'
    }
    else
    {
       url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo'
    }

    fetch(url,{
        method:'POST',
        body: JSON.stringify({email:enteredEmail,password:enteredPassword ,returnSecureToken:true}),
        headers: {'Content-Type':'application/json'}
    })
    
    .then(res => {
        if (res.ok) 
        { 
          setIsLoading(false)
          return res.json();
        } 
        else
        { 
          setIsLoading(false);
          return  res.json().then(data=>{ 
            throw new Error("Authentication Failed") 
          })  
  
        }
      })

      .then(data=> {
        console.log(data)
        console.log('user has sucessfully signedUp')   
        authctx.login(data.idToken,data.email)
        history.push('/expense')  
      })
      .catch(err=> {alert(err);  })
}

const togglehandler=()=>{
   setIsLogin(!isLogin)
}



  return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>

                <h2>{isLogin? 'Login':'SignUp'}</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input type='email'  ref={emailRef} required/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type='password'  ref={passwordRef} required/>
                </div>

                {!isLogin &&<div className="form-group">
                    <label>Confirm Password:</label>
                    <input type='password'  ref={confirmPasswordRef}required />
                </div>}

                { !isLoading &&<button type='submit' className="login-button">{isLogin?'Login':'signUp'}</button>}
                {isLoading && <button type='submit' className="login-button">sending request..</button>}
                <br></br>

                 {isLogin &&<Link type='button' className='forgot'  to='/forgot'>Forgot password?</Link>}

                <button className='toggle'  type='button' onClick={togglehandler}>{isLogin? 'create new account': 'login with existing account'}</button>
                
            </form>
        </div>
    );
};

export default AuthForm;
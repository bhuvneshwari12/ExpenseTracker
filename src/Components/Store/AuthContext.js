import React,{useEffect, useState} from "react";

export const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login : (token) =>{},
    logout : ()=>{},   
});

const AuthContextProvider =(props)=> {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] =useState(initialToken)
    const [logoutTimer, setLogoutTimer] = useState(null);


    const userIsLoggedIn = !!token;         //true/false
    
 
    // useEffect(() => {
    //     if (token) {
    //         const logoutTimer = setTimeout(() => {
    //             logoutHandler();
    //             alert("Your session has expired. Please login again.");
    //         }, 1 * 60 * 1000); 
    //         setLogoutTimer(logoutTimer);
    //     } 
    //     else {
    //         clearTimeout(logoutTimer);
    //     }

    //     return () => {
    //         clearTimeout(logoutTimer);
    //     };
    // }, [token]);

    const loginHandler =(token,email)=>{
       setToken(token)
       localStorage.setItem("token", token)
       localStorage.setItem("email",email)
    }

    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem("email")
    }

  
    const contextValue ={
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler,
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
}

export default AuthContextProvider;
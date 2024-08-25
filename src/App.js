import React, { useContext, useState } from 'react'
import AuthForm from './Components/Pages/Authform/AuthForm'
import Navbar from './Components/Navigation/Navbar';
import { Route } from 'react-router-dom';
import Cart from './Components/Cart/Cart';

import ExpenseTracker from './Components/Pages/ExpenseTracker/ExpenseTracker';
import { AuthContext } from './Components/Store/AuthContext';
import CompleteProfile from './Components/Pages/CompleteProfile/CompleteProfile';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ParticleAnimation from './Components/ReactParticles';

const App = () => {
  const authctx=useContext(AuthContext)
  const [showCart,setShowCart]=useState(false)

  const cartShowHandler=(event)=>{
    event.preventDefault();
    setShowCart(true);
  }
  const cartCloseHandler=()=>{
    setShowCart(false);
  }

  return (
    <div>
    <Navbar cartShowHandler={cartShowHandler}  >
    
     {!authctx.isLoggedIn && <Route path ='/' > <Redirect to='/auth' /></Route>}

       {authctx.isLoggedIn &&  showCart && <Cart cartCloseHandler={cartCloseHandler}/>}
       {authctx.isLoggedIn && <Route path='/expense' exact><ExpenseTracker/></Route> }

      <Route path='/auth' >
       {!authctx.isLoggedIn &&   <AuthForm  /> } 
       {authctx.isLoggedIn &&   <Redirect to ='/expense' /> } 
        </Route>

       {authctx.isLoggedIn &&  <Route path='/completeprofile'> <CompleteProfile/></Route>}
     { !authctx.isLoggedIn && <Route path='/forgot'><ForgotPassword/></Route>}
      
 </Navbar>
  
    </div>
  )
}

export default App;
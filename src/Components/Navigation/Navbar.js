import React, { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Store/AuthContext'
import { useHistory } from 'react-router-dom'

const Navbar = (props) => {
  const authctx=useContext(AuthContext)
  const history=useHistory()

  const handleLogout=()=>{
    authctx.logout()
    history.push('./auth')
  }
  return (
    <div className='navbarr'>
      {authctx.isLoggedIn && <Link to='/expense' className='homee' >Home</Link>}
     {!authctx.isLoggedIn &&  <Link to='/auth' className='loginss'>Login</Link>}
      {authctx.isLoggedIn && <Link to='/' className='loginss' onClick={props.cartShowHandler}>Password</Link>}
     {authctx.isLoggedIn &&  <Link className='logout' onClick={handleLogout} to='/auth'>Logout</Link>}
      {props.children}
    </div>
  )
}

export default Navbar;
import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../ContextFiles/LoginContext'

function Nav(props) {

  const navigate = useNavigate()
  const {loginStatus} = useContext(LoginContext)
  const {userData, user} = useContext(UserContext)

  if (loginStatus && userData && user) return (
    <div>
      <div>{`${userData.username} (${user}) - ${loginStatus}`}</div>
      <div>Home</div>
      <button onClick={()=>navigate('/logout')}>Logout</button>
    </div>
  )
  else return (
    <div>
      <button onClick={()=>navigate('/register')}>Register</button>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Nav;
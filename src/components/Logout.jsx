import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'
import {LoginContext} from '../ContextFiles/LoginContext'
import {UserContext} from '../ContextFiles/UserContext'
import axiosInstance from '../Axios'


function Logout(props) {

  const {setLoginStatus} = useContext(LoginContext)
  const {setUser, setUserData} = useContext(UserContext)

  const [isLoggedOut, setIsLoggedOut] = useState()

  const logout = async () => {
    await axiosInstance.post('users/logout', {
      refresh_token: localStorage.getItem('refresh_token'),
  })
  .then(res => {
      if (res.status) {
        setIsLoggedOut(true)
        setLoginStatus(false)
        return true
      } else {
        console.log("ERROR: Logout failed")
        return false
      }
    })
    .catch(error => {
      console.error(error)
      return false
    })
  }

  useEffect(()=> {
    if( logout() ) {
      setLoginStatus(false)
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('user_id')
      setUser(false)
      setUserData(null)
    }
  },[])


  return (
    <div className='logout-wrapper'>
      <h1>You have successfully logged out.</h1>
      <h3><Link to='/login'>Log in</Link></h3>
    </div>
  );
}

export default Logout;
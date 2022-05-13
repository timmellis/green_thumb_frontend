import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import {LoginContext} from '../ContextFiles/LoginContext'
import {UserContext} from '../ContextFiles/UserContext'
import axiosInstance from '../Axios'


function Logout(props) {

  const {setLoginStatus} = useContext(LoginContext)
  const {user, userData, setUser, setUserData} = useContext(UserContext)

  const [isLoggedOut, setIsLoggedOut] = useState()

  console.log("REFRESH TOKEN",localStorage.getItem('refresh_token'))

  const logout = async () => {
    console.log("INSIDE THE LOGOUT FUNCTION")
    await axiosInstance.post('users/logout', {
      refresh_token: localStorage.getItem('refresh_token'),
  })
  .then(res => {
    console.log("RES=",res)
      if (res.status) {
        setIsLoggedOut(true)
        setLoginStatus(false)
        return true
      } else {
        console.log("ERROR: Logout attempt failed")
        return false
      }
    })
    .catch(error => {
      console.log("CATCH LOGOUT ERROR", error)
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
    console.log(isLoggedOut)
  },[])

  useEffect(()=>{
    console.log("END OF LOGOUT", "USER",user, "userDATA",userData )

  },[user])

  return (
    <div className='logout-wrapper'>
      <h1>You have logged out!</h1>
      <h3><a href='/login'>Log in</a></h3>
    </div>
  );
}

export default Logout;
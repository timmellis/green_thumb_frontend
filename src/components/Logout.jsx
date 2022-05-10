import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import {LoginContext} from '../ContextFiles/LoginContext'
import axiosInstance from '../Axios'


function Logout(props) {

  const {setLoginStatus} = useContext(LoginContext)
  console.log("REFRESH TOKEN",localStorage.getItem('refresh_token'))

  const logout = async () => {
    console.log("INSIDE THE LOGOUT FUNCTION")
    await axiosInstance.post('users/logout', {
      refresh_token: localStorage.getItem('refresh_token'),
  })
  .then(res => {
    console.log("RES=",res)
      if (res.status) {
        setLoginStatus(false)
        return res
      } else {
        console.log("ERROR: Logout attempt failed")
        return res
      }
    })
    .catch(error => {
      console.log("CATCH LOGOUT ERROR", error)
      return console.error
    })
  }

  useEffect(()=> {
    logout()
    setLoginStatus(false)
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('username')
    localStorage.removeItem('access_token')
    localStorage.removeItem('token')
  },[])

  return (
    <div>
      You have logged out!
    </div>
  );
}

export default Logout;
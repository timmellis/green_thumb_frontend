import React, { useContext } from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import global_vars from '../global_vars'


function Calendar(props) {
  const {user, userData, refreshUserData} = useContext(UserContext)

  // console.log(JSON.stringify(global_vars))

  console.log("USer days", userData.pref_day1, userData.pref_day2)
  console.log("Water freq",userData.plants.map(a=>a['water_freq']))

  if (user && userData) return (
    <div>
      Test
    </div>
  ) 
  else return (
    <div>
      Loading...
    </div>
  )
}

export default Calendar;
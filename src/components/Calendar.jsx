import React, { useContext } from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import global_vars from '../global_vars'


function Calendar(props) {
  const {user, userData, refreshUserData} = useContext(UserContext)

  // console.log(global_vars)



  return (
    <div>
      Test
    </div>
  );
}

export default Calendar;
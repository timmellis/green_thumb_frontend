import React, { useContext } from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import GlobalVars from '../globalVars'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {Calendar as CalendarCore} from '@fullcalendar/core'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-icons/font/boostrap-icons.css'

function Calendar(props) {
  const {user, userData, refreshUserData} = useContext(UserContext)

  console.log(JSON.stringify(GlobalVars))

  console.log("User days", userData.pref_day1, userData.pref_day2)
  console.log("Water freq",userData.plants.map(a=>a['water_freq']))

  console.log(GlobalVars)

  if (user && userData) return (
    <div className='container-lg'>
      <FullCalendar 
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        themeSystem= 'bootstrap5'

      />
    </div>
  ) 
  else return (
    <div>
      Loading...
    </div>
  )
}

export default Calendar;
import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import GlobalVars from '../globalVars'
import {Modal, Button} from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
// import {Calendar as CalendarCore} from '@fullcalendar/core'
// import bootstrap5Plugin from '@fullcalendar/bootstrap5'
// import 'bootstrap/dist/css/bootstrap.css'
// // import 'bootstrap-icons/font/boostrap-icons.css'

function Calendar(props) {
  const {user, userData, userHouseplants, refreshUserData} = useContext(UserContext)

  // console.log("User days", userData.pref_day1, userData.pref_day2)
  // console.log("Water freq",userData.plants.map(a=>a['water_freq']))

  // console.log(GlobalVars)
  const [formattedData, setFormattedData] = useState()
  const [modalDisplay, setModalDisplay] = useState({
    title: "I'm a title",
    description: "descrip",
    something: "something"
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    console.log(userData, "HP",userHouseplants)
    if (userHouseplants) setFormattedData(
      [
        userHouseplants.map((hp, i) => {
          return {
            title: hp.plant.name,
            startRecur: hp.date_created,
          }
        })
      ]
    )
  },[user])

  
  if (user && userData) return (
    <div className='container-lg'>
      <FullCalendar 
        plugins={[dayGridPlugin, rrulePlugin]}
        events={[
          {
            title: 'A Different thing',
            startRecur: '2022-05-12',
            daysOfWeek: [1],
            allDay: true,
            description: "Water the plants!",
            anotherThing: "This one too"
          }
        ]}
        eventClick={(item)=>{
          console.log('Event ' + JSON.stringify(item.event))
          handleShow()
          setModalDisplay({
            title: item.event.title,
            description: item.event.extendedProps.description,
            something: item.event.extendedProps.anotherThing

          })
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalDisplay.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDisplay.description} {modalDisplay.something}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size='sm' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  ) 
  else return (
    <div>
      Loading...
    </div>
  )
}

export default Calendar;
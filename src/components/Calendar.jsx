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
  console.log("first load", userHouseplants)

  const [formattedData, setFormattedData] = useState()
  const [modalDisplay, setModalDisplay] = useState({
    title: "",
    notes: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    formatter()
  },[])

  const formatter = () => {
    if (userHouseplants) {
    setFormattedData(
      ///// WATERING SCHEDULE FORMATTING /////
      userHouseplants.map((hp, i) => {
        let hpFreq = 'weekly'
        let hpInterval = 1
        let hpByweekday = [parseInt(userData.pref_day1)]
        if (hp.plant.water_freq.toLowerCase() === "every 6 weeks") {
          // hpFreq = 'weekly'
          hpInterval = 6
        } else if (hp.plant.water_freq.toLowerCase() === "every 2 weeks") {
          // hpFreq = 'weekly'
          hpInterval = 2
        } else if (hp.plant.water_freq.toLowerCase() === "twice per week") {
          // hpFreq = 'weekly'
          hpByweekday = [...hpByweekday, parseInt(userData.pref_day2)]
        } else {
          hpFreq = hp.plant.water_freq.toLowerCase()
        }

        const oneEvent = {
          title: hp.plant.name,
          notes: hp.notes,
          startRecur: `${hp.date_created.slice(0, 10)}`,
          rrule: {
            freq: hpFreq,
            interval: hpInterval,
            byweekday: hpByweekday,
          }
        }
        return oneEvent
      })
    )
  }}



  console.log('FORMATTED',formattedData)

  const thing = [{title: 'New title', startRecur: '2022-05-11', notes:'Chilin', rrule: {freq: 'weekly', interval: 2, byweekday: [5]}}, {title: 'Another title', startRecur: '2022-05-11', notes:'Chilin', rrule: {freq: 'weekly', interval: 2, byweekday: [3]}}]





  if (user && userData && formattedData) 
  return (
    <div className='container-lg'>
      <FullCalendar 
        plugins={[dayGridPlugin, rrulePlugin]}
        events={
          // [
          formattedData
          // {
          //   title: 'A Different thing',
          //   startRecur: '2022-05-11',
          //   allDay: true,
          //   description: "Water the plants!",
          //   anotherThing: "This one too",
          //   rrule: {
          //     freq: 'weekly',
          //     interval: 1,
          //     // byweekday: []
          //   }
          // },    
        // ]
      }
        eventClick={(item)=>{
          console.log('Event ' + JSON.stringify(item.event))
          handleShow()
          setModalDisplay({
            title: item.event.title,
            notes: item.event.extendedProps.notes,
            something: item.event.extendedProps.anotherThing

          })
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalDisplay.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDisplay.notes} {modalDisplay.something}</Modal.Body>
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
      {/* {console.log(formattedData)} */}
    </div>
  )
}

export default Calendar;
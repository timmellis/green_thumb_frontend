import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import GlobalVars from '../globalVars'
import {Modal, Button} from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule'

function Calendar(props) {
  const {user, userData, userHouseplants} = useContext(UserContext)

  const [formattedData, setFormattedData] = useState()
  const [modalDisplay, setModalDisplay] = useState({
    title: "",
    notes: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    if (userHouseplants) formatter()
  },[userHouseplants])

  const formatter = () => {

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
        } else if (hp.plant.water_freq.toLowerCase() === "daily") {
          hpByweekday = []
        } else {
          hpFreq = hp.plant.water_freq.toLowerCase()
        }

        const oneEvent = {
          title: hp.plant.name,
          startRecur: `${hp.date_created.slice(0, 10)}`,
          rrule: {
            freq: hpFreq,
            interval: hpInterval,
            byweekday: hpByweekday,
          },
          eventfocus: 'watering',
          sciname: hp.plant.sci_name,
          notes: hp.notes,
          location: hp.location.name,
          waterfreq: hp.plant.water_freq,
          waterqty: hp.plant.water_qty,
          ferttype: hp.plant.fertilizer_type,
          fertfreq: hp.plant.fertilizer_freq,
          temp: hp.plant.temp,
          humidity: hp.plant.humidity,
          light: hp.plant.light_level,
          description: hp.plant.description
        }

        return oneEvent
      })
    )
}

  // IF ALL DATA HAS LOADED: Display FullCalendar
  if (user && userHouseplants && formattedData) 
  return (
    <div className='container-lg'>


      <FullCalendar 
        plugins={[dayGridPlugin, listPlugin, rrulePlugin]}
        headerToolbar={{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: '',
          end: 'today prev,next dayGridMonth,list' // will normally be on the right. if RTL, will be on the left
        }}
        events={
          formattedData
      }

        eventClick={(item)=>{
          console.log('Event ' + JSON.stringify(item.event))
          setModalDisplay({
            title: item.event.title,
            sciname: item.event.extendedProps.sciname, 
            notes: item.event.extendedProps.notes,
            location: item.event.extendedProps.location,
            waterqty: item.event.extendedProps.waterqty,
            waterfreq: item.event.extendedProps.waterfreq,
            ferttype: item.event.extendedProps.ferttype,
            fertfreq: item.event.extendedProps.fertfreq,
            temp: item.event.extendedProps.temp,
            humidity: item.event.extendedProps.humidity,
            light: item.event.extendedProps.light,
            description: item.event.extendedProps.description,

            // Highlight focus of this event, (e.g. "watering")
            eventfocus: item.event.extendedProps.eventfocus, 
          })
          handleShow()
          console.log('modalDisplay' + JSON.stringify(modalDisplay))
        }}
      />


      {/* DETAILS MODAL THAT WILL APPEAR ON CLICK OF CALENDAR EVENT */}

      <Modal show={show} onHide={handleClose} id='calendar-event-modal'>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>{modalDisplay.title}</div>
            <div className='modal-subtitle' style={{fontSize:'.8em', fontStyle:'italic', fontWeight:'300', marginTop:'0'}}>{modalDisplay.sciname}</div>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <div className='event-modal-body-section' id='event-location'>
            Location: {modalDisplay.location}
          </div>
          <div className='event-modal-body-section' id='event-notes'>
            Notes: <span>{modalDisplay.notes}</span>
          </div>
          <div className={`event-modal-body-section 
          ${modalDisplay.eventfocus==='watering' ? 'eventfocus' : ''}`} 
           id='event-watering'>
            Watering: &nbsp;
            {!modalDisplay.eventfocus ? 
              <span> {modalDisplay.waterqty} | {modalDisplay.waterfreq} </span>
              :  `${modalDisplay.waterqty} | ${modalDisplay.waterfreq}`
            }
          </div>
          <div className='event-modal-body-section' id='event-fertilizer'>
            Fertilizer: <span>{modalDisplay.ferttype} | {modalDisplay.fertfreq}</span>
          </div>
          <div className='event-modal-body-section' id='event-light-temp'>
            Light: <span>{modalDisplay.light}</span> | Temp: <span>{modalDisplay.temp}</span>
          </div>
          <div className='event-modal-body-section' id='event-descr'>
            Description: <span>{modalDisplay.description}</span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size='sm' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  ) 
  
  else return (
    <div>
      Loading...
      {console.log(user, userHouseplants, formattedData)}
    </div>
  )
}

export default Calendar;
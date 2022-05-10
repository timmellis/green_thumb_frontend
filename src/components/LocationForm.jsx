import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'

function LocationForm(props) {

  const navigate = useNavigate()
  const {userData, refreshUserData} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [newLoc, setNewLoc] = useState({
    user_id: null,
    name: "",
    description: "",
    img_url: "",
    light_level: "",
    temp: "",
    humidity: "",
    notes: ""
  })

  useEffect(() => {
    if (userData) setNewLoc({...newLoc, user_id: userData.id})
  },[userData])

  useEffect(() => {         // IF id, then populate form w existing data 
    if (id && userData) {
      let thisLoc = userData.locations.filter( a => a.id === parseInt(id))[0]
      console.log("THISLOC",thisLoc)
      setNewLoc({...newLoc, 
        user_id: thisLoc.user_id,
        name: thisLoc.name, 
        description: thisLoc.description,
        img_url: thisLoc.img_url,
        light_level: thisLoc.light_level,
        temp: thisLoc.temp,
        humidity: thisLoc.humidity,
        notes: thisLoc.notes
      })
      // Object.keys(thisLoc).forEach((a) => {
      //   console.log("THISKEY",a, "THISLOC[a]", thisLoc[a], "NEWLOC",newLoc)
      //   if (a==='id' || a==='img_url' || a==='plants') console.log(null)
      //   else setNewLoc({...newLoc, [a]: "this"})
      // })
    }
  }, [userData])

  useEffect(() => {
    console.log("NEWLOC = ",newLoc)
  })

  const handleChange = (e) => {
    setNewLoc({...newLoc, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
     
    let res
    if(!id) res = 
      API.post('locations/', newLoc)
        .then(()=>refreshUserData())
        .then(()=>navigate(-1))
        .catch(console.error)
    else if (id && !isDelete) res =
      API.put(`locations/${id}`, newLoc)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
        API.delete(`locations/${id}`)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    console.log(res)
  }


  if (userData) {
    return (
    <div className='form-container form-location-container'>
      <h2>{id ? (isDelete ? "Delete " : "Update ") : "Create New "}
        Location{isDelete ? "?" : ":"}
      </h2>

      <form onSubmit={(e)=>handleSubmit(e)} className='form-location'>

      {/* YOU CAN DELETE THIS AFTER DEVELOPMENT */}
        <label htmlFor='id'>user_id: </label>
        <input type='text' name='user_id' id='loc-user-id' value={newLoc.user_id + " (" + userData.name + ")"} onChange={(e)=>handleChange(e)} disabled />

        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' id='loc-name' value={newLoc.name} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='description'>Description: </label>
        <textarea name='description' id='loc-description' value={newLoc.description} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        {/* <label htmlFor='img_url'>Image: </label>
        <input type='file' name='img_url' id='loc-img-url' value={newLoc.img_url} onChange={(e)=>handleChange(e)} /> */}
        <label htmlFor='img_url'>Image: </label>
        <input type='text' name='img_url' id='loc-img-url' value={newLoc.img_url} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='light_level'>Light level: </label>
        <input type='text' name='light_level' id='loc-light-level' value={newLoc.light_level} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='temp'>Avg. Temp.: </label>
        <input type='text' name='temp' id='loc-temp' value={newLoc.temp} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='humidity'>Avg. Humidity: </label>
        <input type='text' name='humidity' id='loc-humidity' value={newLoc.humidity} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='notes'>Notes: </label>
        <input type='text' name='notes' id='loc-notes' value={newLoc.notes} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label></label>
        <div className='form-buttons'>
          <button type='submit' className={isDelete ? "delete-button" : "submit-button"}>{!isDelete ? "Submit" : "Delete"}</button>
          <button type='cancel' className='cancel-button' onClick={()=>navigate('/')}>Cancel</button>
        </div>
      </form>

    </div>
  );
  } else {
    <div class='loading-screen'>Loading...</div>
  }
}

export default LocationForm;
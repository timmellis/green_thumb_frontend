import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'

function PlantForm(props) {

  const navigate = useNavigate()
  const {userData, refreshUserData} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [newPlant, setNewPlant] = useState({
    name: "",
    sci_name: "",
    description: "",
    water_freq: "",
    water_qty: "",
    fertilizer_type: "",
    fertilizer_freq: "",
    img_url: "",
    light_level: "",
    temp: "",
    humidity: ""
  })

  // useEffect(() => {
  //   if (userData) setNewPlant({...newPlant, user_id: userData.id})
  // },[userData])

  useEffect(() => {         // IF id, then populate form w existing data 
    if (id && userData) {
      let thisPlant = userData.locations.filter( a => a.id === parseInt(id))[0]
      console.log("THISPLANT",thisPlant)
      setNewPlant({...newPlant, 
        name: thisPlant.name,
        sci_name: thisPlant.sci_name,
        description: thisPlant.description,
        img_url: thisPlant.img_url,
        water_freq: thisPlant.water_freq,
        water_qty: thisPlant.water_qty,
        light_level: thisPlant.light_level,
        temp: thisPlant.temp,
        humidity: thisPlant.humidity,    
        fertilizer_type: thisPlant.fertilizer_type,
        fertilizer_freq: thisPlant.fertilizer_freq,
      })
      // Object.keys(thisLoc).forEach((a) => {
      //   console.log("THISKEY",a, "THISLOC[a]", thisLoc[a], "NEWLOC",newLoc)
      //   if (a==='id' || a==='img_url' || a==='plants') console.log(null)
      //   else setNewLoc({...newLoc, [a]: "this"})
      // })
    }
  }, [userData])

  useEffect(() => {
    console.log("NEWPLANT = ",newPlant)
  })

  const handleChange = (e) => {
    setNewPlant({...newPlant, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let res
    if(!id) res = 
      API.post('plants/', newPlant)
        .then(()=>refreshUserData())
        .then(()=>navigate(-1))
        .catch(console.error)
    else if (id && !isDelete) res =
      API.put(`plants/${id}`, newPlant)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
        API.delete(`plants/${id}`)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    console.log("RES=",res)
  }


  if (userData) {
    return (
    <div className='form-container form-location-container'>
      <h2>{id ? (isDelete ? "Delete " : "Update ") : "Create New "}
        Plant{isDelete ? "?" : ":"}
      </h2>

      <form onSubmit={(e)=>handleSubmit(e)} className='form-plant'>

      {/* YOU CAN DELETE THIS AFTER DEVELOPMENT */}
        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' id='plant-name' value={newPlant.name} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='sci_name'>Scientific Name: </label>
        <input type='text' name='sci_name' id='plant-sci-name' value={newPlant.sci_name} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='description'>Description: </label>
        <textarea name='description' id='plant-description' value={newPlant.description} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        {/* <label htmlFor='img_url'>Image: </label>
        <input type='file' name='img_url' id='loc-img-url' value={newLoc.img_url} onChange={(e)=>handleChange(e)} /> */}
        <label htmlFor='img_url'>Image: </label>
        <input type='text' name='img_url' id='plant-img-url' value={newPlant.img_url} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='water_freq'>Watering Freq: </label>
        <input type='text' name='water_freq' id='plant-water-freq' value={newPlant.water_freq} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='water_qty'>Watering Amt: </label>
        <input type='text' name='water_qty' id='plant-water-qty' value={newPlant.water_qty} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='light_level'>Ideal light level: </label>
        <input type='text' name='light_level' id='plant-light-level' value={newPlant.light_level} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='temp'>Ideal Temp.: </label>
        <input type='text' name='temp' id='plant-temp' value={newPlant.temp} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='humidity'>Ideal Humidity: </label>
        <input type='text' name='humidity' id='plant-humidity' value={newPlant.humidity} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='fertilizer_type'>Fertilizer (type): </label>
        <input type='text' name='fertilizer_type' id='plant-fertilizer-type' value={newPlant.fertilizer_type} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label htmlFor='fertilizer_freq'>Fertilizer Freq: </label>
        <input type='text' name='fertilizer_freq' id='plant-fertilizer-freq' value={newPlant.fertilizer_freq} onChange={(e)=>handleChange(e)} disabled={isDelete} />

        <label></label>
        <div className='form-buttons'>
          <button type='submit' className={isDelete ? "delete-button" : "submit-button"}>{!isDelete ? "Submit" : "Delete"}</button>
          <button type='cancel' className='cancel-button' onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>

    </div>
  );
  } else {
    <div class='loading-screen'>Loading...</div>
  }
}

export default PlantForm;
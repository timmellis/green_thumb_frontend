import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../UserContext'
import {Routes, Route, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'

function HouseplantForm(props) {

  const navigate = useNavigate()
  const {userData, refreshUserData, allPlants, userHouseplants, refreshUserHouseplants} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [newHouseplant, setNewHouseplant] = useState({
    user_id: null,
    plant_id: null,
    loc_id: null,
    img_url: null,
    notes: ""

  })

  useEffect(() => {
    if (userData) setNewHouseplant({...newHouseplant, user_id: userData.id})
  },[userData])

  useEffect(() => {         // IF id, then populate form w existing data 
    if (id && userData) {
      let thisHouseplant = userHouseplants.filter( a => a.id === parseInt(id))[0]
      console.log("THISPLANT",thisHouseplant)
      setNewHouseplant({...newHouseplant, 
        user_id: thisHouseplant.user_id,
        plant_id: thisHouseplant.plant_id,
        loc_id: thisHouseplant.loc_id,
        img_url: thisHouseplant.img_url,
        notes: thisHouseplant.notes,
      })
      // Object.keys(thisLoc).forEach((a) => {
      //   console.log("THISKEY",a, "THISLOC[a]", thisLoc[a], "NEWLOC",newLoc)
      //   if (a==='id' || a==='img_url' || a==='plants') console.log(null)
      //   else setNewLoc({...newLoc, [a]: "this"})
      // })
    }
  }, [userHouseplants])

  useEffect(() => {
    console.log("NEW HOUSEPLANT = ",newHouseplant)
    console.log("ALL PLANTS", allPlants)
  })

  const handleChange = (e) => {
    setNewHouseplant({...newHouseplant, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let res
    if(!id) res = 
      API.post('houseplants/', newHouseplant)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && !isDelete) res =
      API.put(`houseplants/${id}`, newHouseplant)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
        API.delete(`houseplants/${id}`)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    console.log("RES=",res)
  }


  if (userData && allPlants) {
    return (
    <div className='form-container form-houseplants-container'>
      <h2>{id ? (isDelete ? "Delete " : "Update ") : "Create New "}
        Plant{isDelete ? "?" : ":"}
      </h2>

      <form onSubmit={(e)=>handleSubmit(e)} className='form-houseplant'>

      {/* YOU CAN DELETE THIS AFTER DEVELOPMENT */}
        <label htmlFor='user_id'>User: </label>
        <input type='text' name='user_id' id='houseplant-user-id' value={userData.name} onChange={(e)=>handleChange(e)} disabled />

        <label htmlFor='plant_id'>Which plant? </label>
        <select name='plant_id' id='plant-id' value={newHouseplant.plant_id} onChange={(e)=>handleChange(e)} disabled={isDelete}>
          {/* {allPlants.map()} */}
        </select>

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

export default HouseplantForm;
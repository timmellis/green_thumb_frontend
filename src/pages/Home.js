import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../Axios'
// import API from '../API'
import {UserContext} from '../ContextFiles/UserContext'
import ItemDropdown from '../components/ItemDropdown'
import HouseplantDropdown from '../components/HouseplantDropdown'
// import { LoginContext } from '../ContextFiles/LoginContext';
import {Button} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

function Home(props) {

  const navigate = useNavigate()

  const {
    userData, 
    userHouseplants, 
    // refreshUserData, 
    // refreshUserHouseplants, 
    // allPlants, 
    // refreshAllPlants
  } = useContext(UserContext)

  // useEffect(()=>{

  // },[]) 



  // if (userData && userData.name && userData.plants && userData.locations && userHouseplants) {
    if (userData && userHouseplants) {
    return (
    <div>
      <h1>
        Welcome, {userData.first_name ? userData.first_name : userData.username}!
      </h1>

      <h3>Your Houseplants:</h3>
      {userHouseplants.map((p,i) => (
        <div className='user-plants-container section-container dropdown-container' key={i}>
          <HouseplantDropdown item={p} slug='houseplant' id={p.id} index={i} />
        </div>
      ))}
      <button className='add-button' onClick={()=>navigate('new/houseplant/')}>Add New Houseplant...</button>
      <button className='add-button' onClick={()=>navigate('new/plant/')}>Add New Plant...</button>

      <h3>Your locations:</h3>
      {userData.locations.map((p,i) => (
        <div className='user-locations-container section-container dropdown-container' key={i}>
          <ItemDropdown item={p} slug='location' id={p.id} index={i} />
        </div>
      ))}

      <Button className='btn-sm add-button' onClick={()=>navigate(`new/location/`)}>
        <Icon.GeoFill /> Add New Location...
      </Button>


      {/* <p>Or, check out ALL the plants folks have registered so far!</p>
      {allPlants.map((d,i) => (
        <div className='all-plants-container section-container dropdown-container' key={i}>
          <ItemDropdown item={d} key={i} id={i} />
        </div>
      ))}
      <button onClick={handleClick}>Click</button> */}
    </div>
    )
  } else {
      return (
        <div className='flex-full-col'>
          <div className='loading-page'>Loading...</div>
        </div>  
      )
    }
}

export default Home;
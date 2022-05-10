import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'
import {UserContext} from '../ContextFiles/UserContext'
import ItemDropdown from '../components/ItemDropdown'
import HouseplantDropdown from '../components/HouseplantDropdown'

function Home(props) {

  const navigate = useNavigate()

  const {userData, refreshUserData, userHouseplants, refreshUserHouseplants, allPlants, refreshAllPlants} = useContext(UserContext)

  // useEffect(()=>{

  // },[]) 

  const [newPlant, setNewPlant] = useState(
    {
      name: "Sunflower",
      sci_name: "Not recorded",
      description: "Some stuff goes here about the plant",
      img_url: null,
      water_freq: "Once per week",
      water_qty: "normal",
      light_level: "Direct Low",
      temp: "Room temp (55-70 F)",
      humidity: "Medium",
      fertilizer_type: "a",
      fertilizer_freq: "b"
    }
  )

  const refreshData = () => {
  }

  const postData = () => {
    API.post('plants/', newPlant).then(()=> refreshData())
  }

  const handleClick = () => {
    const res = postData()
  }

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
          <HouseplantDropdown item={p} slug='houseplant' id={p.id} />
        </div>
      ))}
      <button className='add-button' onClick={()=>navigate('new/houseplant/')}>Add New Houseplant...</button>
      <button className='add-button' onClick={()=>navigate('new/plant/')}>Add New Plant...</button>

      <h3>Your locations:</h3>
      {userData.locations.map((p,i) => (
        <div className='user-locations-container section-container dropdown-container' key={i}>
          <ItemDropdown item={p} slug='location' id={p.id} />
        </div>
      ))}
      <button className='add-button' onClick={()=>navigate(`new/location/`)}>Add New Location...</button>


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
      <div onClick={()=>navigate('/login')}>Please Log in →</div>
      )
    }
}

export default Home;
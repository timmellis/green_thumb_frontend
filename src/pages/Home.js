import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../UserContext'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'
import ItemDropdown from '../components/ItemDropdown'

function Home(props) {

  const {userData, refreshUserData, allPlants, refreshAllPlants} = useContext(UserContext)
  const navigate = useNavigate()

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

  useEffect(() => {
    // const getSomeData = someData()
      // refreshData()
    // console.log("USEEFFECT", getSomeData)
  }, [])

  const refreshData = () => {
  }

  const postData = () => {
    API.post('plants/', newPlant).then(()=> refreshData())
  }

  const handleClick = () => {
    console.log("Clicked!")
    const res = postData()
    // console.log(res)
  }

  if (userData && userData.name && userData.plants && userData.locations) return (
    <div>
      <h1>Welcome, {userData.name}!</h1>

      <h3>Your Houseplants:</h3>
      {userData.plants.map((p,i) => (
        <div className='user-plants-container section-container dropdown-container' key={i}>
          <ItemDropdown item={p} slug='plant' id={`plant-${i}`} />
        </div>
      ))}
      <button className='add-button' onClick={()=>navigate('new/houseplant/')}>Add New Houseplant...</button>
      <button className='add-button' onClick={()=>navigate('new/plant/')}>Add New Plant...</button>

      <h3>Your locations:</h3>
      {userData.locations.map((p,i) => (
        <div className='user-locations-container section-container dropdown-container' key={i}>
          <ItemDropdown item={p} slug='location' id={`loc-${i}`} />
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
  );
}

export default Home;
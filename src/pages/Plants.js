import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'
import ItemDropdown from '../components/ItemDropdown'

function Home(props) {

  const {userData, refreshUserData, allPlants, refreshAllPlants} = useContext(UserContext)

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

  const postData = () => {
    API.post('plants/', newPlant).then(()=> refreshAllPlants())
  }

  const handleClick = () => {
    const res = postData()
    console.log("Posted data:", res)
  }

  if (userData && userData.name && allPlants && allPlants.length) return (
    <div>
      <h3>All registered plants:</h3>
      {allPlants.map((d,i) => (
        <div className='all-plants-container section-container dropdown-container' key={i}>
          <ItemDropdown item={d} key={i} id={i} />
        </div>
      ))}
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default Home;
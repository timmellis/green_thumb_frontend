import logo from './logo.svg';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useState, useEffect, createContext} from 'react'
import UserContext from './UserContext'
import Home from './pages/Home'
import Plants from './pages/Plants'
import LocationForm from './components/LocationForm'
import PlantForm from './components/PlantForm'
import HouseplantForm from './components/HouseplantForm'
import API from './API'

function App() {

  // FOR NOW, USER = 1
  const [user, setUser] = useState(1)
  const [userData, setUserData] = useState(null)
  const [userHouseplants, setUserHouseplants] = useState(null)
  const [allPlants, setAllPlants] = useState([])


  useEffect(() => {
    refreshUserData()
    refreshAllPlants()
    if(user) refreshUserHouseplants()
  }, [])

  const refreshUserData = () => {
    API.get(`users/alldetails/${user}`)
      .then((res) => {
        console.log("USER",res.data)
        setUserData(res.data)
      })
      .catch(console.error)
  }


  function sortBy(arr, field) {
    arr.sort((a,b)=> {return a[field] < b[field] ? -1 : (a[field] > b[field] ? 1 : 0)})
  }
  
  const refreshUserHouseplants = () => {
    API.get(`houseplants/`)
      .then((res) => {
        let myHouseplants = res.data.filter(a => a.user_id===user)
        console.log("HOUSEPLANTS",res.data, "MYPLANTS",myHouseplants)
        setUserHouseplants(res.data
        .sort((a,b)=> {return a.plant.name < b.plant.name ? -1 : (a.plant.name>b.plant.name ? 1 : 0)})
        )
      })
      .catch(console.error)
  }

  const refreshAllPlants = () => {
    API.get("plants/")
      .then((res) => {
        // console.log("ALL PLANTS",res.data)
        setAllPlants(res.data.sort((a,b)=> {return a.name < b.name ? -1 : (a.name>b.name ? 1 : 0)}))
      })
      .catch(console.error)
  }



  return (
    <div className="App">
    <UserContext.Provider value={{userData, refreshUserData, allPlants, refreshAllPlants, userHouseplants, refreshUserHouseplants}}>
      <header>Header for app</header>
      {/* <Home /> */}
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/new/houseplant' element={<HouseplantForm />} />
        <Route path='/update/houseplant/:id' element={<HouseplantForm />} />
        <Route path='/delete/houseplant/:id' element={<HouseplantForm action='delete' />} />

        <Route path='/plants' element={<Plants />} />
        <Route path='/new/plant' element={<PlantForm />} />
        <Route path='/update/plant/:id' element={<PlantForm />} />
        <Route path='/delete/plant/:id' element={<PlantForm action='delete' />} />

        <Route path='/new/location' element={<LocationForm />} />
        <Route path='/update/location/:id' element={<LocationForm />} />
        <Route path='/delete/location/:id' element={<LocationForm action='delete' />} />
      </Routes>
    </UserContext.Provider>
    </div>
  );
}

export default App;

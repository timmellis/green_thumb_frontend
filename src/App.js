import logo from './logo.svg';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useState, useEffect, createContext} from 'react'
import UserContext from './UserContext'
import Home from './pages/Home'
import LocationForm from './components/LocationForm'
import API from './API'

function App() {

  // FOR NOW, USER = 1
  const [user, setUser] = useState(1)
  const [userData, setUserData] = useState(null)
  const [allPlants, setAllPlants] = useState([])


  useEffect(() => {
    refreshUserData()
    refreshAllPlants()
  }, [])

  const refreshUserData = () => {
    API.get(`users/alldetails/${user}`)
      .then((res) => {
        console.log("USER",res.data)
        setUserData(res.data)
      })
      .catch(console.error)
  }

  const refreshAllPlants = () => {
    API.get("plants/")
      .then((res) => {
        // console.log("ALL PLANTS",res.data)
        setAllPlants(res.data)
      })
      .catch(console.error)
  }



  return (
    <div className="App">
    <UserContext.Provider value={{userData, refreshUserData, allPlants, refreshAllPlants}}>
      <header>Header for app</header>
      {/* <Home /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new/location' element={<LocationForm />} />
        <Route path='/update/location/:id' element={<LocationForm />} />
        <Route path='/delete/location/:id' element={<LocationForm action='delete' />} />
      </Routes>
    </UserContext.Provider>
    </div>
  );
}

export default App;

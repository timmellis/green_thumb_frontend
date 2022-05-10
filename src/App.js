import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import * as Icon from 'react-bootstrap-icons';


import axiosInstance from './Axios'
import UserContext from './ContextFiles/UserContext'
import {LoginContext} from './ContextFiles/LoginContext'

import Home from './pages/Home'
import Plants from './pages/Plants'
import TopNav from './components/Nav'
import LocationForm from './components/LocationForm'
import PlantForm from './components/PlantForm'
import HouseplantForm from './components/HouseplantForm'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
// import Axios from 'axios';


function App() {
  
  const navigate = useNavigate()

  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userHouseplants, setUserHouseplants] = useState(null)
  const [allPlants, setAllPlants] = useState([])  
  
  const [loginStatus, setLoginStatus] = useState(false)


  console.log("LocalStorage",JSON.stringify(localStorage))
  
  async function loginTest(username) {
    await axiosInstance.get(`users/${username}`)
    .then(res => {
      console.log("HOME LOGINTEST RES", res)
      if (res.status === 200) {      
        setLoginStatus(true)
        return true
      }
    })
    .catch(error => console.error)
  }

  useEffect(()=>{
    const user_id = localStorage.getItem('user_id')
    const username = localStorage.getItem('username')
    console.log("FIRST LOAD LOGIN TEST", user_id, username)

    if (user_id && username) {
      if(loginTest(username)) refreshLoginAndData()
    }
  }, [loginStatus])

  const refreshLoginAndData = () => {
    const userIdLoggedIn = localStorage.getItem('user_id') 
    console.log("LOGIN STATUS", loginStatus, "LOCALSTORAGE USER_ID",userIdLoggedIn)
    if (userIdLoggedIn) {
      console.log("LOGIN STATUS", loginStatus, JSON.stringify(localStorage))
      setUser(localStorage.getItem('user_id'))
    } else {
      setUser(false)
    }
  }
  
  useEffect(() => {
    refreshUserData()
    refreshAllPlants()
    if(user) refreshUserHouseplants()
    console.log("USERHOUSEPLANTS",userHouseplants)
  }, [user])

  const refreshUserData = () => {
    if (user && user!=='undefined') {
      console.log("USER",user)
      axiosInstance.get(`users/alldetails/${user}`)
        .then((res) => {
          console.log("USER",res.data)
          setUserData(res.data)
        })
        .then((res) => {
          refreshUserHouseplants()
        })
        .catch(console.error)
    }
  }

  const refreshUserHouseplants = () => {
    axiosInstance.get(`houseplants/`)
      .then((res) => {
        let myHouseplants = res.data.filter(a => parseInt(a.user_id)===parseInt(user))
        console.log("HOUSEPLANTS",res.data, "MYPLANTS",myHouseplants, "user", user)
        if (myHouseplants.length) {
          setUserHouseplants(myHouseplants
          .sort((a,b)=> {return a.plant.name < b.plant.name ? -1 : (a.plant.name>b.plant.name ? 1 : 0)})
          )
        } else {
          setUserHouseplants([])
        }
      })
      .catch(console.error)
  }

  const refreshAllPlants = () => {
    axiosInstance.get("plants/")
      .then((res) => {
        // console.log("ALL PLANTS",res.data)
        setAllPlants(res.data.sort((a,b)=> {return a.name < b.name ? -1 : (a.name>b.name ? 1 : 0)}))
      })
      .catch(console.error)
  }



  return (
  <LoginContext.Provider value={{loginStatus, setLoginStatus}}>

    <div className="App">

    <UserContext.Provider value={{user, setUser, userData, setUserData, refreshUserData, allPlants, refreshAllPlants, userHouseplants, refreshUserHouseplants}}>

      <header>
        <TopNav />
      </header>



        <Routes>

          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/Logout' element={<Logout />} />

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
  </LoginContext.Provider>
  );
}

export default App;

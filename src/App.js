import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';


import axiosInstance from './Axios'
import UserContext from './ContextFiles/UserContext'
import {LoginContext} from './ContextFiles/LoginContext'

import Home from './pages/Home'
import Plants from './pages/Plants'
import TopNav from './components/Nav'
import Footer from './components/Footer'
import Calendar from './components/Calendar'
import UserForm from './components/UserForm'
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
  
  const [loginStatus, setLoginStatus] = useState('unset')


  useEffect(()=>{
    const user_id = localStorage.getItem('user_id')
    const username = localStorage.getItem('username')
    // console.log("APP.JS---FIRST LOAD LOGIN TEST", user_id, username, loginStatus)

    // IF localStorage data exists AND passes LoginTest(), THEN refresh login status and load user data ( refreshLoginAndData() )
    if (user_id && username) {
      if(loginTest(username)) refreshLoginAndData()   
    } else setLoginStatus(false)
  }, [loginStatus])


  async function loginTest(username) {
    // console.log("loginTest 1", username)
    await axiosInstance.get(`users/${username}`)
    .then(res => {
      if (res.status === 200) {
        setLoginStatus(true)
        return true
      } else {
        setLoginStatus(false)
        return false
      }
    })
    .catch(error => {
      setLoginStatus(false)
      console.error()
    })
  }

  const refreshLoginAndData = () => {
    const userIdLoggedIn = localStorage.getItem('user_id') 
    // console.log("LOGIN STATUS", loginStatus, "LOCALSTORAGE USER_ID",userIdLoggedIn)
    if (userIdLoggedIn) {
      // console.log("LOGIN STATUS", loginStatus, JSON.stringify(localStorage))
      setUser(localStorage.getItem('user_id'))
      refreshUserData()
    } else {
      setUser(false)
    }
  }
  
  const refreshUserData = () => {
    if (user && user!=='undefined') {
      // console.log("USER",user)
      axiosInstance.get(`users/alldetails/${user}`)
        .then((res) => {
          console.log("REFRESH USER RES",res.data)
          setUserData(res.data)
        })
        .then((res) => {
          refreshUserHouseplants()
        })
        .catch(console.error)
    }
  }

  // CHECK IF IMAGE EXISTS
function checkIfImageExists(url) {
  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    return(true);
  } else {
    img.onload = () => {
      return(true);
    };
    
    img.onerror = () => {
      return(false);
    };
  }
}

    
  useEffect(() => {
    if (loginStatus===true) {
      refreshUserData()
      refreshAllPlants()
    }
    if(user) refreshUserHouseplants()
  }, [user, loginStatus])


  const refreshUserHouseplants = () => {
    axiosInstance.get(`houseplants/`)
      .then((res) => {
        let myHouseplants = res.data.filter(a => parseInt(a.user_id)===parseInt(user))
        // console.log("HOUSEPLANTS",res.data, "MYPLANTS",myHouseplants, "user", user)
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
        setAllPlants(res.data.sort((a,b)=> {return a.name < b.name ? -1 : (a.name>b.name ? 1 : 0)}))
      })
      .catch(console.error)
  }




if (loginStatus === false)
  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      {console.log(loginStatus && userData)}
      <div className="App">
        <UserContext.Provider
          value={{
            user,
            setUser,
            userData,
            setUserData,
            refreshUserData,
            allPlants,
            refreshAllPlants,
            userHouseplants,
            refreshUserHouseplants,
          }}
        >
          <header>
            <TopNav />
          </header>

          <div className="flex-full-col">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Logout" element={<Logout />} />
            </Routes>
            <img
              src={require("./assets/logo.png")}
              alt="logo-large"
              className="splash-logo"
            />
          </div>

          <footer>
            <Footer />
          </footer>
        </UserContext.Provider>
      </div>
    </LoginContext.Provider>
  );



else if (loginStatus && userData)
  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <div className="App">
        <UserContext.Provider
          value={{
            user,
            setUser,
            userData,
            setUserData,
            refreshUserData,
            allPlants,
            refreshAllPlants,
            userHouseplants,
            refreshUserHouseplants,
            checkIfImageExists
          }}
        >

          <header>
            <TopNav />
          </header>

          <div className="App-body">
            <div className="flex-full-col-start container-lg">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />

                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                <Route path="/preferences" element={<UserForm />} />
                <Route path="/calendar" element={<Calendar />} />

                <Route path="/new/houseplant" element={<HouseplantForm />} />
                <Route
                  path="/update/houseplant/:id"
                  element={<HouseplantForm />}
                />
                <Route
                  path="/delete/houseplant/:id"
                  element={<HouseplantForm action="delete" />}
                />

                <Route path="/plants" element={<Plants />} />
                <Route path="/new/plant" element={<PlantForm />} />
                <Route path="/update/plant/:id" element={<PlantForm />} />
                <Route
                  path="/delete/plant/:id"
                  element={<PlantForm action="delete" />}
                />

                <Route path="/new/location" element={<LocationForm />} />
                <Route path="/update/location/:id" element={<LocationForm />} />
                <Route
                  path="/delete/location/:id"
                  element={<LocationForm action="delete" />}
                />
              </Routes>
              <img
                src={require("./assets/logo_v2.png")}
                alt="logo-large"
                className="splash-logo"
              />
            </div>
          </div>

          <footer>
            <Footer />
          </footer>

        </UserContext.Provider>
      </div>
    </LoginContext.Provider>
  );


  
// else if (loginStatus==='unset') return (
else
  return (
    <div className="App">
      <div className="flex-full-col">
        <div className="loading-page">
          <Spinner animation="border" variant="primary" /> Loading...
        </div>
      </div>
    </div>
  );
}

export default App;

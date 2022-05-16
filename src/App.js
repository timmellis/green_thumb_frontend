import './App.css';
import {Route, Routes} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'

import axiosInstance from './Axios'
import UserContext from './ContextFiles/UserContext'
import {LoginContext} from './ContextFiles/LoginContext'

import Home from './pages/Home'
import About from './pages/About'
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


function App() {
  

  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userHouseplants, setUserHouseplants] = useState(null)
  const [allPlants, setAllPlants] = useState([])  
  
  const [loginStatus, setLoginStatus] = useState('unset')

  useEffect(()=>{
    const user_id = localStorage.getItem('user_id')
    const username = localStorage.getItem('username')
    
    // IF localStorage data exists AND that data passes LoginTest(), 
    // THEN refresh login status and load user data ( refreshLoginAndData() )
    if (user_id && username) {
      if(loginTest(username)) refreshLoginAndData()   
    } else setLoginStatus(false)
  }, [loginStatus])


  async function loginTest(username) {
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
    if (userIdLoggedIn) {
      setUser(localStorage.getItem('user_id'))
      refreshUserData()
    } else {
      setUser(false)
    }
  }
  
  const refreshUserData = () => {
    if (user && user!=='undefined') {
      axiosInstance.get(`users/alldetails/${user}`)
        .then((res) => {
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


// ***** DISPLAY CONTENT: ***** //

// *** IF LOGGED IN = FALSE: LIMIT ROUTES, ROOT ==> LOGIN PAGE *** //

if (loginStatus === false)
  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <div className="App">
        <UserContext.Provider
          value={{
            user,
            setUser,
            userData,
            setUserData
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


// *** IF LOGGED IN = TRUE && USERDATA LOADED: FULL ROUTES, ROOT ==> HOME PAGE *** //

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
                <Route path="/about" element={<About />} />

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


  
// *** IF LOGGED IN =/= TRUE OR FALSE (i.e. "unset"): SHOW Loading *** //

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

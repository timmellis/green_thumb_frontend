import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../ContextFiles/UserContext'
import ItemDropdown from '../components/ItemDropdown'
import HouseplantDropdown from '../components/HouseplantDropdown'
import {Button, Spinner} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {RiPlantLine} from 'react-icons/ri'
import {GiFruitTree} from 'react-icons/gi'

function Home(props) {

  const navigate = useNavigate()

  // GET NEEDED DATA FROM UserContext 
  const {
    user,
    userData, 
    userHouseplants, 
    checkIfImageExists
  } = useContext(UserContext)


    if (userData && userHouseplants) {
      let profImgValid = userData.profileImg ? checkIfImageExists(user.profile_img) : false

    return (
    <div className='container-lg'>
      <div className='home-welcome-banner'>
        {profImgValid &&
          <img className='home-profile-img h1' src={userData.profile_img} alt='profile img' />
        } 
        <h1>
          Welcome, {userData.first_name ? userData.first_name : userData.username}!
        </h1>
      </div>  

      <h3 className='section-title accordion-title'>Your Houseplants:</h3>
      {userHouseplants.map((p,i) => (
        <div className='user-plants-container section-container dropdown-container' key={i}>
          <HouseplantDropdown item={p} slug='houseplant' id={p.id} index={i} />
        </div>
      ))}
      <Button className='add-button' onClick={()=>navigate('new/houseplant/')}>
        <RiPlantLine size='1.25em' /> Add New Houseplant...
      </Button>
      <Button className='add-button' onClick={()=>navigate('new/plant/')}>
        <GiFruitTree size='1.25em' /> Add New Plant...
      </Button>

      <h3 className='section-title accordion-title'>Your locations:</h3>
      {userData.locations.map((p,i) => (
        <div className='user-locations-container section-container dropdown-container' key={i}>
          <ItemDropdown item={p} slug='location' id={p.id} index={i} />
        </div>
      ))}

      <Button className='btn-sm add-button' onClick={()=>navigate(`new/location/`)}>
        <Icon.GeoFill /> Add New Location...
      </Button>

    </div>
    )
  } else {
      return (
        <div className='flex-full-col'>
          <div className='loading-page'>
            <Spinner animation="border" variant="primary" /> Loading...
          </div>
        </div>  
      )
    }
}

export default Home;
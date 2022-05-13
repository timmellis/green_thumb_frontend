import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'
import ItemDropdown from '../components/ItemDropdown'

function Plants(props) {

  const {userData, allPlants} = useContext(UserContext)

  useEffect(() => {
    console.log(userData, allPlants)
  }, [])


  if (userData && allPlants) return (
    <div>
      <h3>All registered plants:</h3>
      {allPlants.map((d,i) => (
        <div key={i}>
          <ItemDropdown item={d} key={i} id={i} />
        </div>
      ))}
    </div>
  ) 
  else return (
    <div className='loading'>
      Loading...
    </div>
  )
}

export default Plants;
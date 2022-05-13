import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams} from 'react-router-dom'
import Axios from 'axios'
import API from '../API'
import ItemDropdown from '../components/ItemDropdown'
import {Container, Row, Col, ListGroup} from 'react-bootstrap'
import {RiPlantFill,RiPlantLine} from 'react-icons/ri'

function Plants(props) {

  const {userData, allPlants} = useContext(UserContext)
  console.log(allPlants)
  useEffect(() => {
    console.log(userData, allPlants)
  }, [])


  if (userData && allPlants.length) return (
    <Container>
      <h3>All registered plants:</h3>
      <Row>
        <Col xs={12} md={4} className='sidebar-list-column'>
          <ListGroup className='sidebar-list-container'>
            {allPlants.map((d,i) => (
              <ListGroup.Item key={i} onClick={()=>alert(d.id)}>
                {userData.plants.some(p=>p.id === d.id) ? (<span><RiPlantLine />&nbsp;</span>) : ""}
                {d.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={8} className='plant-details-column'>
          
        </Col>
      </Row>
      
      
    </Container>
  ) 
  else return (
    <div className='loading'>
      Loading...
    </div>
  )
}

export default Plants;
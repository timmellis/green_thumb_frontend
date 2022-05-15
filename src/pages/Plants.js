import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Container, Row, Col, ListGroup, Card} from 'react-bootstrap'
import {RiPlantLine} from 'react-icons/ri'

function Plants(props) {

  const {userData, allPlants} = useContext(UserContext)
  const [currentPlant, setCurrentPlant] = useState()


  useEffect(() => {
    console.log('userData', userData, 'allPlants', allPlants)
    if (allPlants && allPlants.length) setCurrentPlant(allPlants[0])
  }, [])


  const listClick = (id) => {
    let thisPlant = allPlants.filter(a=> a.id===id)[0]
    setCurrentPlant(thisPlant)
  }

  if (userData && allPlants.length && currentPlant) return (
    <Container>
      <h3>All registered plants:</h3>
      <Row>
        <Col xs={12} md={4} lg={3} className='sidebar-list-column'>
          <ListGroup className='sidebar-list-container'>
            {allPlants.map((d,i) => (
              <ListGroup.Item key={i} onClick={()=>listClick(d.id)}>
                {userData.plants.some(p=>p.id === d.id) ? (<span><RiPlantLine />&nbsp;</span>) : ""}
                {d.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={8} lg={9} className='plant-details-column'>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{currentPlant.name}</Card.Title>
              <Card.Subtitle style={{fontStyle:'italic'}}>{currentPlant.sci_name}</Card.Subtitle>
              <Card.Text align='left' style={{fontWeight:'300'}}>
                {currentPlant.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Water: {currentPlant.water_qty} | {currentPlant.water_freq}</ListGroup.Item>
              <ListGroup.Item>Soil/Fertilizer: {currentPlant.fertilizer_type} | {currentPlant.fertilizer_freq}</ListGroup.Item>
              <ListGroup.Item>Ideal Light: {currentPlant.light_level} | Ideal Temp: {currentPlant.temp}</ListGroup.Item>
            </ListGroup>
            {/* <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body> */}
  </Card>
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
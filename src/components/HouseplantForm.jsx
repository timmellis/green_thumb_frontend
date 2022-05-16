import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useParams, useNavigate} from 'react-router-dom'
import axiosInstance from '../Axios'
import { Form, Button, Row, Col } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {RiPlantLine} from 'react-icons/ri'
import {GiFruitTree} from 'react-icons/gi'


function HouseplantForm(props) {

  const navigate = useNavigate()
  const {userData, refreshUserData, allPlants, refreshAllPlants, userHouseplants, refreshUserHouseplants} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [newHouseplant, setNewHouseplant] = useState({
    user_id: null,
    plant_id: null,
    loc_id: null,
    img_url: "",
    notes: ""
  })

  useEffect(() => {
    if (userData) setNewHouseplant({...newHouseplant, user_id: userData.id})
  },[userData])
  
  useEffect(() => {
    refreshAllPlants()
  }, [])

  useEffect(() => {         
    // IF id, then populate form w existing data 
    if (id && userData) {
      let thisHouseplant = userHouseplants.filter( a => a.id === parseInt(id))[0]

      setNewHouseplant({...newHouseplant, 
        user_id: thisHouseplant.user_id,
        plant_id: thisHouseplant.plant_id,
        loc_id: thisHouseplant.loc_id,
        img_url: thisHouseplant.img_url,
        notes: thisHouseplant.notes,
      })
    }
  }, [userHouseplants])


  const handleChange = (e) => {
    setNewHouseplant({...newHouseplant, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let res
    if(!id) res = 
      axiosInstance.post('houseplants/', newHouseplant)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && !isDelete) res =
      axiosInstance.put(`houseplants/${id}`, newHouseplant)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
      axiosInstance.delete(`houseplants/${id}`)
        .then(()=>refreshUserData())
        .then(()=>refreshUserHouseplants())
        .then(()=>navigate('/'))
        .catch(console.error)
    console.log("RES=",res)
  }


  if (userData && allPlants) {
    return (
    <div className='form form-container form-houseplants'>
      <h2>{id ? (isDelete ? "Remove " : "Update ") : "Record A New "}
        Houseplant{isDelete ? "?" : ":"}
      </h2>
      
      <Form onSubmit={(e)=>handleSubmit(e)} className='d-grid form-houseplant'>
      <Form.Group className='d-grid gap-2'>

        <Row>
          <Col xs={12} lg={12} className='form-line-content'>
            <h5>{userData.first_name}'s Houseplants</h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='plant_id'>Select plant: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='plant_id' id='plant-id' value={newHouseplant.plant_id} onChange={(e)=>handleChange(e)} disabled={isDelete} required>
              <option value='' disabled selected hidden>---</option>
              {allPlants.map((plant,i) => (
                <option value={plant.id}>{plant.name}</option>
                ))}
            </Form.Select>
            { !isDelete &&
              <div>
                Can't find your plant?
                <Button onClick={()=>navigate('/new/plant/')} disabled={isDelete}>
                  <GiFruitTree size='1.3rem' /> Add a New Plant to the database
                </Button>
              </div>
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='loc_id'>Location: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='loc_id' id='loc-id' value={newHouseplant.loc_id} onChange={(e)=>handleChange(e)} disabled={isDelete} required>
              <option value='' disabled selected hidden>---</option>
              {userData.locations.map((loc,i) => (
                <option value={loc.id}>{loc.name}</option>
                ))}
            </Form.Select>
            {!isDelete && 
              <div>
                Can't find your location?
                <Button onClick={()=>navigate('/new/location/')} disabled={isDelete} >
                  <Icon.GeoFill /> Add a new location to your home
                </Button>
              </div>
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='img_url'>Image:</Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='img_url' id='houseplant-img-url' value={newHouseplant.img_url} onChange={(e)=>handleChange(e)} disabled={isDelete}  />
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='notes'>Specific Notes: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control as='textarea' name='notes' id='houseplant-notes' value={newHouseplant.notes} onChange={(e)=>handleChange(e)} disabled={isDelete}  />
          </Col>
        </Row>


        <Form.Label></Form.Label>
        <div className='form-buttons'>
          <Button type='submit' className={!isDelete ? "submit-button" : "delete-button"} variant={!isDelete ? 'primary' : 'danger'}>
            {!isDelete ? <span><RiPlantLine size='1.3rem' />Submit</span> : <span><Icon.XCircleFill /> Delete</span>}
          </Button>
          <Button variant='secondary' type='cancel' className='cancel-button' onClick={()=>navigate(-1)}>Cancel</Button>
        </div>
      </Form.Group>
      </Form>

    </div>
  );
  } else {
    <div class='loading-screen'>Loading...</div>
  }
}

export default HouseplantForm;
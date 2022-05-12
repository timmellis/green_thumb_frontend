import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {Routes, Route, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import axiosInstance from '../Axios'
import {Form, Button, Col, Row} from 'react-bootstrap'

function UserForm(props) {

  const navigate = useNavigate()
  const {userData, refreshUserData} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [userPreferences, setUserPreferences] = useState({
    id: null,
    name: "",
    description: "",
    img_url: "",
    light_level: "",
    temp: "",
    humidity: "",
    notes: ""
  })

  useEffect(() => {
    if (userData) setUserPreferences({...userPreferences, id: userData.id})
  },[userData])

  useEffect(() => {         // IF id, then populate form w existing data 
    if (userData) {
      setUserPreferences({...userPreferences, 
        id: thisLoc.user_id,
        name: thisLoc.name, 
        description: thisLoc.description,
        img_url: thisLoc.img_url,
        light_level: thisLoc.light_level,
        temp: thisLoc.temp,
        humidity: thisLoc.humidity,
        notes: thisLoc.notes
      })
      // Object.keys(thisLoc).forEach((a) => {
      //   console.log("THISKEY",a, "THISLOC[a]", thisLoc[a], "NEWLOC",newLoc)
      //   if (a==='id' || a==='img_url' || a==='plants') console.log(null)
      //   else setNewLoc({...newLoc, [a]: "this"})
      // })
    }
  }, [userData])

  useEffect(() => {
    console.log("NEWLOC = ",newLoc)
  })

  const handleChange = (e) => {
    setNewLoc({...newLoc, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
     
    let res
    if(!id) res = 
      axiosInstance.post('locations/', newLoc)
        .then(()=>refreshUserData())
        .then(()=>navigate(-1))
        .catch(console.error)
    else if (id && !isDelete) res =
      axiosInstance.put(`locations/${id}`, newLoc)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
        axiosInstance.delete(`locations/${id}`)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    console.log(res)
  }


  if (userData) {
    return (
    <div className='form form-container form-locations'>
      <h2>{id ? (isDelete ? "Delete " : "Update ") : "Create New "}
        Location{isDelete ? "?" : ":"}
      </h2>

      <Form onSubmit={(e)=>handleSubmit(e)} className='d-grid form-location'>
        <Form.Group className='d-grid gap-2'>

        {/* YOU CAN DELETE THIS AFTER DEVELOPMENT */}
        
        <Row>
        <Col xs={12} lg={12} className='form-line-content'>
          <h5>{userData.first_name}'s Home</h5>
        </Col>
        </Row>

        
        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='name'>Name: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='name' id='loc-name' value={newLoc.name} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='description'>Description: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control as='textarea' name='description' id='loc-description' value={newLoc.description} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='img_url'>Image: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='img_url' id='loc-img-url' value={newLoc.img_url} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='light_level'>Light Level: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='light_level' id='loc-light-level' value={newLoc.light_level} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='temp'>Avg. Temp.: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='temp' id='loc-temp' value={newLoc.temp} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='humidity'>Avg. Humidity: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='humidity' id='loc-humidity' value={newLoc.humidity} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='notes'>Notes: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control as='textarea' type='text' name='notes' id='loc-notes' value={newLoc.notes} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

          <Form.Label></Form.Label>
          <div className='form-buttons'>
            <Button type='submit' className={isDelete ? "delete-button" : "submit-button"}>
              {!isDelete ? "Submit" : "Delete"}
            </Button>
            <Button variant='secondary' type='cancel' className='cancel-button' onClick={()=>navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Form.Group>
      </Form>

    </div>
  );
  } else {
    <div class='loading-screen'>Loading...</div>
  }
}

export default UserForm;
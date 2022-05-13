import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../Axios'
import {Form, Button, Col, Row, Modal} from 'react-bootstrap'
import {RiCheckboxCircleFill} from 'react-icons/ri'

function UserForm(props) {


  // GLOBAL VARS
  // daysOfWeek will determine the order of "Days" dropdown in "Preferences"
  const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday']


  const navigate = useNavigate()

  const {user, userData, refreshUserData} = useContext(UserContext)
  const [userPreferences, setUserPreferences] = useState({})
  // const isDelete = props.action === 'delete' ? true : false

  // BOOTSTRAP MODAL SETTINGS 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (userData) setUserPreferences({
      ...userData, 
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      profile_img: userData.profile_img,
      pref_day1: userData.pref_day1,
      pref_day2: userData.pref_day2,

    })
    console.log('userdata',userData,'userPrefs',userPreferences)
  },[])

  const handleChange = (e) => {
    setUserPreferences({...userPreferences, [e.target.name]: e.target.value})
    console.log(e.target.name, "=", e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()  
    console.log("SUBMIT",userPreferences)
    axiosInstance.put(`users/${userData.id}`, userPreferences)
      .then(res => {
        console.log("RES",res)
        refreshUserData()

      })
      .catch(error => console.error)
    // if(!id) res = 
    //   axiosInstance.post('locations/', userPreferences)
    //     .then(()=>refreshUserData())
    //     .then(()=>navigate(-1))
    //     .catch(console.error)
    // else if (id) res =
    //   axiosInstance.put(`locations/${id}`, userPreferences)
    //     .then(()=>refreshUserData())
    //     .then(()=>navigate('/'))
    //     .catch(console.error)
    // console.log(res)
  }


  
  if (userData) {
    return (
    <div className='form form-container form-locations'>
      <h2>
        Profile Info & Preferences
      </h2>

      <Form onSubmit={(e)=>handleSubmit(e)} className='d-grid form-location'>
        <Form.Group className='d-grid gap-2'>
          <h5> Title </h5>

        {/* YOU CAN DELETE THIS AFTER DEVELOPMENT */}
        
        {/* <Row>
        <Col xs={12} lg={12} className='form-line-content'>
          <h5>{userData.first_name}'s Home</h5>
        </Col>
        </Row> */}

        
        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='first_name'>First Name: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='first_name' id='first-name' value={userPreferences.first_name} onChange={(e)=>handleChange(e)} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='last_name'>Last Name: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='last_name' id='last-name' value={userPreferences.last_name} onChange={(e)=>handleChange(e)} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='username'>Username: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='username' id='username' value={userPreferences.username} onChange={(e)=>handleChange(e)} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='email'>Email: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='email' name='email' id='email' value={userPreferences.email} onChange={(e)=>handleChange(e)}  />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='profile_img'>Profile Image: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='profile_img' id='profile-img' value={userPreferences.profile_img} onChange={(e)=>handleChange(e)} />
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='pref_day1'>Weekly Plant Care Day: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='pref_day1' id='pref-day1' value={userPreferences.pref_day1} onChange={(e)=>handleChange(e)}>
              {daysOfWeek.map((day, i) => (
                <option value={i}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='pref_day2'>Secondary Plant Care Day: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='pref_day2' id='pref-day2' value={userPreferences.pref_day2} onChange={(e)=>handleChange(e)}>
              {daysOfWeek.map((day, i) => (
                  <option value={i} selected={i===3}>
                    {day}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>

          <Form.Label></Form.Label>
          <div className='form-buttons'>
            <Button type='submit' className='submit-button' onClick={() => {
              handleShow(); 
              setTimeout(()=>handleClose(), 1500);
            }}>
              Save
            </Button>
            <Button variant='secondary' type='cancel' className='cancel-button' onClick={()=>navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose} size='sm' centered style={{fontSize:'.75em', opacity:'.85'}}>
        <Modal.Header closeButton style={{background:'var(--main-color-50)', padding:'8px'}}>
          <Modal.Title variant='primary'></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'8px', textAlign:'center'}}>
          <RiCheckboxCircleFill /> Changes saved.
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>





    </div>
  );
  } else {
    <div class='loading-screen'>Loading...</div>
  }
}

export default UserForm;
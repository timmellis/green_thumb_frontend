import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../Axios'
import GlobalVars from '../globalVars'
import {Form, Button, Row, Col} from 'react-bootstrap'

function PlantForm(props) {




  const gbifSpeciesApi = axios.create({
    baseURL: 'https://api.gbif.org/v1/',
    timeout: 5000   
  })
  
  const gbifSearch = async (name) => {
    const formatname = encodeURIComponent(name.trim())
    await gbifSpeciesApi.get(`/species/search?q=${formatname}`
    )
    .then(res => {
      let filter = res.data.results.filter(d => d.kingdom==="Plantae")
      console.log(filter)
    })
    .catch(error => console.error(error, error.request.responseText))
  }
  console.log("GBIF TEST",gbifSearch("snake plant"))

  // const natureServeApi = axios.create({
  //   baseURL: 'https://explorer.natureserve.org',
  //   timeout: 5000,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "accept": "application/json"
  //   }    
  // })
  
  // const test = async () => {
  //   await natureServeApi.post('/api/data/speciesSearch', 
  //     {
  //       "criteriaType": "species",
  //       "speciesTaxonomyCriteria": [{
  //         "paramType" : "scientificTaxonomy",
  //         "level" : "KINGDOM",
  //         "scientificTaxonomy" : "Plantae",
  //         // "kingdom" : "Plantae"
  //       }],
  //       "textCriteria": [{
  //         "paramType" : "quickSearch",
  //         "searchToken" : "dracaena trifasciata"
  //       }]
  //     }
  //   )
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(error => console.error(error, error.request.responseText))
  // }
  
  // console.log("TEST",test())




  const navigate = useNavigate()
  const {userData, refreshUserData} = useContext(UserContext)
  const {id} = useParams()
  const isDelete = props.action === 'delete' ? true : false

  const [newPlant, setNewPlant] = useState({
    name: "",
    sci_name: "",
    description: "",
    water_freq: GlobalVars.water_freq_default,
    water_qty: GlobalVars.water_qty_default,
    fertilizer_type: GlobalVars.fertilizer_type_default,
    fertilizer_freq: GlobalVars.fertilizer_freq_default,
    img_url: "",
    light_level: GlobalVars.light_level_default,
    temp: GlobalVars.temp_default,
    humidity: GlobalVars.humidity_default
  })


  useEffect(() => {         
    // IF id, then populate form w existing data 
    if (id && userData) {
      let thisPlant = userData.locations.filter( a => a.id === parseInt(id))[0]

      setNewPlant({...newPlant, 
        name: thisPlant.name,
        sci_name: thisPlant.sci_name,
        description: thisPlant.description,
        img_url: thisPlant.img_url,
        water_freq: thisPlant.water_freq,
        water_qty: thisPlant.water_qty,
        light_level: thisPlant.light_level,
        temp: thisPlant.temp,
        humidity: thisPlant.humidity,    
        fertilizer_type: thisPlant.fertilizer_type,
        fertilizer_freq: thisPlant.fertilizer_freq,
      })
    }
  }, [userData])


  const handleChange = (e) => {
    setNewPlant({...newPlant, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let res
    if(!id) res = 
      axiosInstance.post('plants/', newPlant)
        .then(()=>refreshUserData())
        .then(()=>navigate(-1))
        .catch(console.error)
    else if (id && !isDelete) res =
      axiosInstance.put(`plants/${id}`, newPlant)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
    else if (id && isDelete) res =
        axiosInstance.delete(`plants/${id}`)
        .then(()=>refreshUserData())
        .then(()=>navigate('/'))
        .catch(console.error)
  }


  if (userData) {
    return (
    <div className='form form-container form-plants'>
      <h2>{id ? (isDelete ? "Delete " : "Update ") : "Create New "}
        Plant{isDelete ? "?" : ":"}
      </h2>

      <Form onSubmit={(e)=>handleSubmit(e)} className='d-grid form-plant'>
      <Form.Group className='d-grid gap-2'>

      <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='name'>Common Name: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='name' id='plant-name' value={newPlant.name} onChange={(e)=>handleChange(e)} disabled={isDelete} required />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='sci_name'>Scientific Name: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='sci_name' id='plant-sci-name' value={newPlant.sci_name} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='description'>Description: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control as='textarea' name='description' id='plant-description' value={newPlant.description} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='img_url'>Image: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Control type='text' name='img_url' id='plant-img-url' value={newPlant.img_url} onChange={(e)=>handleChange(e)} disabled={isDelete} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='water_freq'>Watering (Frequency): </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='water_freq' id='plant-water-freq' value={newPlant.water_freq} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              <option value='' disabled selected hidden>---</option>
              {GlobalVars.water_freq_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='water_qty'>Watering (Amount): </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='water_qty' id='plant-water-qty' value={newPlant.water_qty} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              <option value='' disabled selected hidden>---</option>
              {GlobalVars.water_qty_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>

          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='light_level'>Ideal Light Level: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='light_level' id='plant-light-level' value={newPlant.light_level} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              <option value='' disabled selected hidden>---</option>
              {GlobalVars.light_level_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>

          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='temp'>Ideal Temp.: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='temp' id='plant-temp' value={newPlant.temp} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              <option value='' disabled selected hidden>---</option>
              {GlobalVars.temp_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>

          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='humidity'>Ideal Humidity: </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='humidity' id='plant-humidity' value={newPlant.humidity} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              <option value='' disabled selected hidden>---</option>
              {GlobalVars.humidity_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>

          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='fertilizer_type'>Fertilizer (Type): </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
            <Form.Select name='fertilizer_type' id='plant-fertilizer-type' value={newPlant.fertilizer_type} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              {GlobalVars.fertilizer_type_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>

          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={3} className='form-line-title'>
            <Form.Label htmlFor='fertilizer_freq'>Fertilizer (Frequency): </Form.Label>
          </Col>
          <Col xs={12} lg={9} className='form-line-content'>
          <Form.Select name='fertilizer_freq' id='plant-fertilizer-freq' value={newPlant.fertilizer_freq} onChange={(e)=>handleChange(e)} disabled={isDelete}>
              {GlobalVars.fertilizer_freq_vars.map((line,i) => (
                <option value={line} key={i}>{line}</option>
              ))}
            </Form.Select>
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

export default PlantForm;
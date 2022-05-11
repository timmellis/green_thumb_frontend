import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Accordion, ListGroup, Button, Row, Col } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

function HouseplantDropdown(props) {

  const navigate = useNavigate()

  const hpKeys = Object.keys(props.item)
  const thisKeys = Object.keys(props.item.plant)

  return (
    <Accordion className='container-lg'>
      <Accordion.Item eventKey={props.index}>
          {/* Header w/ title for dropdown */}
        <Accordion.Header> 
          {props.item.plant.name}
        </Accordion.Header>

          {/* The rest of the content */}
        <Accordion.Body>
          <ListGroup.Item className='d-flex justify-content-center align-items-center'>
            <Row className='item-dropdown-line container-lg'>
              <Col xs={12} lg={3} className='item-dropdown-line-title'>
                Location:
              </Col>
              <Col xs={12} lg={9} className='item-dropdown-line-content'>
                {props.item.location.name}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-center align-items-start'>
            <Row className='item-dropdown-line container-lg'>
              <Col xs={12} lg={3} className='item-dropdown-line-title'>
                Your Notes:
              </Col>
              <Col xs={12} lg={9} className='item-dropdown-line-content'>
                {props.item.notes}
              </Col>
            </Row>
          </ListGroup.Item>

          {/* If exists, display image first */}
          {(thisKeys.includes('img_url') && props.item.plant.img_url) 
            ? <ListGroup.Item 
              className='item-dropdown-banner-img' 
              style={{backgroundImage:`url(${props.item.plant.img_url}`}}>
                <img alt={props.item.plant.name} src={props.item.plant.img_url} />
              </ListGroup.Item>
            : <ListGroup.Item className='item-dropdown-banner-img-none'>
                (no image)
              </ListGroup.Item>
          }

          {thisKeys.map((k,i)=> (
            (props.item.plant[k] && k!=='id' && k!=='name' && k!=='user_id' && k!=='img_url') &&
            <ListGroup.Item key={i} className='d-flex justify-content-center align-items-start'>
              <Row className='item-dropdown-line container-lg'>
                <Col xs={12} lg={3} className='item-dropdown-line-title'> 
                  {k.split('_').join(' ')}: 
                </Col> 
                {Array.isArray(props.item.plant[k]) 
                ? <Col xs={12} lg={9} className='item-dropdown-line-content'> 
                  {props.item.plant[k].map((a,i)=> (
                    <div key={i}>{a.name}</div>
                  ))} 
                  </Col>
                : <Col xs={12} lg={9} className='item-dropdown-content'> 
                    {props.item.plant[k]} 
                  </Col>
                }
              </Row>
            </ListGroup.Item>
            ))}

            <ListGroup.Item className='d-flex justify-content-between align-items-start'>
              <Row className='item-dropdown-line container-lg'>
                <Col xs={12} lg={12} className='item-dropdown-line-content'>
                  <Button className='btn-sm' 
                    onClick={()=>navigate(`update/${props.slug}/${props.id}`)}>
                      <Icon.PencilFill /> Edit
                  </Button>
                  <Button variant='danger' className='btn-sm'
                    onClick={()=>navigate(`delete/${props.slug}/${props.id}`)}>
                      <Icon.XCircleFill /> Delete
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
  
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default HouseplantDropdown;
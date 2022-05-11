import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {Accordion, ListGroup, Row, Col, Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

function ItemDropdown(props) {

  const navigate = useNavigate()

  const thisKeys = Object.keys(props.item)

  return (
    <Accordion className='container-lg'>
      <Accordion.Item eventKey={props.index}>
        {/* Header w/ title for dropdown */}
        <Accordion.Header>{props.item.name} </Accordion.Header>

      {/* The rest of the content */}
        <Accordion.Body>
          <ListGroup>

          {/* If exists, display image first */}
          {(thisKeys.includes('img_url') && props.item.img_url)  
            ? <ListGroup.Item 
              className='item-dropdown-banner-img' 
              style={{backgroundImage:`url(${props.item.img_url}`}}>
            </ListGroup.Item>
            : <ListGroup.Item 
                className='item-dropdown-banner-img-none'>
                  (no image)
              </ListGroup.Item>
          }

          {thisKeys.map((k,i)=> (
            (k!=='name' && k!=='id' && k!=='img_url' && k!=='user_id') &&

            <ListGroup.Item key={i} className='d-flex justify-content-between align-items-start'>
              <Row className='item-dropdown-line container-lg'>
                <Col xs={12} lg={3} className='item-dropown-line-title'>
                  {k}: 
                </Col> 
                {Array.isArray(props.item[k]) 
                  ? <Col xs={12} lg={9} className='item-dropdown-line-content'> 
                    {props.item[k].map((a,i)=> (
                      <div key={i}>{a.name}</div>
                      ))} 
                    </Col>
                  : <Col xs={12} lg={9} className='item-dropdown-line-content'>
                      {props.item[k]}
                    </Col>
                }
              </Row>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className='d-flex justify-content-between align-items-start'>
            <Row className='item-dropdown-line container-lg'>
              <Col xs={12} lg={3} className='item-dropdown-line-title'>
                Actions:
              </Col>
              <Col xs={12} lg={9} className='item-dropdown-line-content'>
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
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  );
}

export default ItemDropdown;
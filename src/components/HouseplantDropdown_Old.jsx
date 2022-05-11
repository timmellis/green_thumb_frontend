import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function HouseplantDropdown(props) {

  const navigate = useNavigate()

  const toggleDropdown = (id) => {
    let thisDiv = document.getElementById(`info-${id}`)
    if (!thisDiv.style.maxHeight || thisDiv.style.maxHeight==='0px') { 
      // Possible: Close ALL other dropdowns?
      thisDiv.style.maxHeight = '500px'

    } else {
      thisDiv.style.maxHeight = 0
    }
  }

  const hpKeys = Object.keys(props.item)
  const thisKeys = Object.keys(props.item.plant)

  return (
    <div className='item-dropdown-container'>
      
      {/* Header w/ title for dropdown */}
      <div className='item-dropdown-header' onClick={()=>toggleDropdown(props.slug + "-" + props.id)}>{props.item.plant.name} ({props.item.location.name}) <span className='dropdown-arrow'>▼</span></div>

      {/* The rest of the content */}
      <div className='item-dropdown-info' id={`info-${props.slug + "-" + props.id}`}>

      <div className='item-dropdown-line'>
        <div className='item-dropdown-line-title'>Location:</div>
        <div className='item-dropdown-line-title'>{props.item.location.name}</div>
      </div>
      <div className='item-dropdown-line'>
        <div className='item-dropdown-line-title'>Your Notes:</div>
        <div className='item-dropdown-line-title'>{props.item.notes}</div>
      </div>

        {/* If exists, display image first */}
        {(thisKeys.includes('img_url') && props.item.plant.img_url) ?  
          <div className='item-dropdown-banner-img' style={{backgroundImage:`url(${props.item.plant.img_url}`}}></div>
          : <div className='item-dropdown-banner-img-none'>(no image)</div>
        }

        {thisKeys.map((k,i)=> (
          (props.item.plant[k] && k!=='id' && k!=='name' && k!=='user_id' && k!=='img_url') &&
          <div key={i} className='item-dropdown-line' id={`item-dropdown-info-${k}`}>
            <div className='item-dropown-line-title'> {k}: </div> 
            {Array.isArray(props.item.plant[k]) ? 
              <div className='item-dropdown-line-content'> {props.item.plant[k].map((a,i)=> (
                <div key={i}>{a.name}</div>
              ))} </div>
              :
              <div className='item-dropdown-line-content'> {props.item.plant[k]} </div>
            }
          </div>
        ))}
        <div className='item-dropdown-line'>
          <div className='item-dropdown-line-title'>Actions: </div>
          <div>
            <button onClick={()=>navigate(`update/${props.slug}/${props.id}`)}>Edit</button>
            <button onClick={()=>navigate(`delete/${props.slug}/${props.id}`)}>Delete</button>
          </div>
        </div>
    </div>
  </div>
  );
}

export default HouseplantDropdown;
import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function ItemDropdown(props) {

  const navigate = useNavigate()

  const toggleDropdown = (id) => {
    let thisDiv = document.getElementById(`info-${id}`)
    if (!thisDiv.style.maxHeight || thisDiv.style.maxHeight==='0px') { 
      // Possible: Close ALL other dropdowns?
      thisDiv.style.maxHeight = '1200px'

    } else {
      thisDiv.style.maxHeight = 0
    }
  }

  const thisKeys = Object.keys(props.item)

  return (
    <div className='item-dropdown-container'>
      
      {/* Header w/ title for dropdown */}
      <div className='item-dropdown-header' onClick={()=>toggleDropdown(props.slug + "-" + props.id)}>{props.item.name} <span className='dropdown-arrow'>▼</span></div>

      {/* The rest of the content */}
      <div className='item-dropdown-info' id={`info-${props.slug + "-" + props.id}`}>
        {/* If exists, display image first */}
        {(thisKeys.includes('img_url') && props.item.img_url) ?  
          <div className='item-dropdown-banner-img' style={{backgroundImage:`url(${props.item.img_url}`}}></div>
          : <div className='item-dropdown-banner-img-none'>(no image)</div>
        }

        {thisKeys.map((k,i)=> (
          (k!=='name' && k!=='id' && k!=='img_url' && k!=='user_id') &&
          <div key={i} className='item-dropdown-line' id={`item-dropdown-info-${k}`}>
            <div className='item-dropown-line-title'> {k}: </div> 
            {Array.isArray(props.item[k]) ? 
              <div className='item-dropdown-line-content'> {props.item[k].map((a,i)=> (
                <div key={i}>{a.name}</div>
              ))} </div>
              :
              <div className='item-dropdown-line-content'> {props.item[k]} </div>
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

export default ItemDropdown;
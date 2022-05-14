import React from 'react';
import {RiCopyrightLine, RiGithubFill, RiLinkedinBoxFill} from 'react-icons/ri'
import {Row, Col} from 'react-bootstrap'

function Footer(props) {
  return (
    <div className='app-footer container-lg'>
    
      <div className='footer-left'>
        <img src={require('../assets/logo_v2.png')} height='25px' alt='logo' /> Green Thumb 
      </div>

      <div className='footer-center'>
        Created & designed by Tim Ellis <RiCopyrightLine id='copyright-icon'/> 2022
      </div>

      <div className='footer-right'>
        <a href='https://github.com/timmellis/green_thumb_frontend' target='_blank'>
          <RiGithubFill className='social-icon social-icon-github' alt='github' />
        </a>
        <a href='https://www.linkedin.com/in/tim-m-ellis/' target='_blank'>
          <RiLinkedinBoxFill className='social-icon social-icon-linkedin' alt='linkedin' />
        </a>
      </div>

    </div>
  );
}

export default Footer;
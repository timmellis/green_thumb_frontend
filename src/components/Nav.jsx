import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../ContextFiles/LoginContext'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {FiSettings} from 'react-icons/fi'

import logo_png from '../assets/logo_v2.png'
import logo_text_png from '../assets/logo_text_v2.png'

function TopNav(props) {

  const navigate = useNavigate()
  const {loginStatus} = useContext(LoginContext)
  const {userData, user, checkIfImageExists} = useContext(UserContext)

  const navLinkBugFix = (e) => {
    e.preventDefault(); 
    navigate(e.target.attributes.href.nodeValue)
  }


  if (loginStatus && userData && user) {

    // Verify profile image is not broken link
    let profImgValid = userData.profileImg ? checkIfImageExists(user.profile_img) : false

    return (
      <div>
        <Navbar collapseOnSelect expand='lg'>
          <Container>
            <Navbar.Brand href="/">
              <img alt="logo" src={logo_png} width="32" height="32" className="d-inline-block align-top" />
              <img alt="logo-text" src={logo_text_png} height="32" className="d-inline-block align-top" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id='responsive-navbar-nav'  >
              <Nav>
                <Nav.Link href='/' onClick={navLinkBugFix}>
                  {profImgValid &&
                    <img className='nav-profile-img nav-profile-img-screen-sm' src={userData.profile_img} alt='profile img' />
                  }
                  Home
                </Nav.Link>
                <Nav.Link href='/calendar' onClick={navLinkBugFix}>Calendar</Nav.Link>
                <Nav.Link href='/plants' onClick={navLinkBugFix}>Browse Plants</Nav.Link>
                <Nav.Link href='/about' onClick={navLinkBugFix}>About</Nav.Link>

              </Nav>
              <Nav>
                <Nav.Link href='/preferences' onClick={navLinkBugFix}>
                  {profImgValid &&
                    <img className='nav-profile-img nav-profile-img-screen-lg' src={userData.profile_img} alt='profile img' />
                  }
                  Preferences <FiSettings />
                </Nav.Link>
                <Nav.Link href='/logout' onClick={navLinkBugFix}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
  else return (
    <Navbar collapseOnSelect expand='lg'>
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo_png} className="d-inline-block align-top" />
          <img alt="logo-text" src={require('../assets/logo_text.png')} className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
            <Nav.Link href='/about' onClick={navLinkBugFix}>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav;
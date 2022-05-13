import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../ContextFiles/UserContext'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../ContextFiles/LoginContext'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {FiSettings} from 'react-icons/fi'

import logo_png from '../assets/logo.png'


function TopNav(props) {

  const navigate = useNavigate()
  const {loginStatus} = useContext(LoginContext)
  const {userData, user} = useContext(UserContext)

  if (loginStatus && userData && user) return (
    <div>
  <Navbar collapseOnSelect expand='lg'>
    <Container>
      <Navbar.Brand href="/">
        <img alt="logo" src={logo_png} width="32" height="32" className="d-inline-block align-top" />
        <img alt="logo-text" src={require('../assets/logo_text.png')} height="32" className="d-inline-block align-top" />
        {/* Green Thumb */}
      </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/calendar'>Calendar</Nav.Link>
            <Nav.Link href='/plants'>Browse Plants</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='/logout'>Logout</Nav.Link>
            <Nav.Link href='/preferences'>Preferences <FiSettings /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
        {/* <div>{`${userData.username} (${user}) - ${loginStatus}`}</div> */}
        {/* <button onClick={()=>navigate('/logout')}>Logout</button> */}
    </div>
  )
  else return (
    <Navbar collapseOnSelect expand='lg'>
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo_png} className="d-inline-block align-top" />
          <img alt="logo-text" src={require('../assets/logo_text.png')} className="d-inline-block align-top" />
          {/* Green Thumb */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav;
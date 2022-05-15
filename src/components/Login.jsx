import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {LoginContext} from '../ContextFiles/LoginContext'
import axiosInstance from '../Axios'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import {RiAlertFill} from 'react-icons/ri'

function Login(props) {

  const navigate = useNavigate()

    const {setLoginStatus} = useContext(LoginContext)
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [loginAttemptError, setLoginAttemptError] = useState(false)

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    async function handleSubmit(e)  {
        e.preventDefault()

        await axiosInstance.post('token/obtain/', {
            username: login.username,
            password: login.password
        })
        .then(res => {
            if (res.status === 200) {
              axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
              localStorage.setItem('access_token', res.data.access)
              localStorage.setItem('refresh_token', res.data.refresh)
            } else {
              console.log("ERROR: Login attempt failed")
              return res
            }
          })
          .then(res => {
            axiosInstance.get(`users/${login.username}`)
            .then(res => {
              localStorage.setItem('user_id', res.data.id)
              localStorage.setItem('username', login.username)
              setLoginStatus(true)
            })
            .then(() => {
              navigate('/')
              setTimeout(()=>navigate('/'),2000)
            })
        })
        .catch(error => {
          setLoginAttemptError(true)
          console.error(error)
        })
    }

    return (
        <div className='form login-form'>
            <h1>Login</h1>
            {loginAttemptError && 
              <Alert variant='warning'>
                <RiAlertFill styla={{fontSize:'1.2rem'}} /> Username and/or password not found. Please try again.
              </Alert>
            }
            <Form mw='lg' onSubmit={handleSubmit} className='d-grid gap-2'>
                <Form.Control type='text' name='username' placeholder='Username' value={login.username} onChange={handleChange}></Form.Control>
                <Form.Control type='password' name='password' placeholder='Password' value={login.password} onChange={handleChange}></Form.Control>
                <Button type='submit'>Login</Button>      
            </Form>
            <div className='form-footer'>
                <Container>
                  Don't have an account yet?
                <Button href='/register/'type="button" variant='link'>Register</Button>
                </Container>
            </div>
        </div>
    );
}

export default Login;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {LoginContext} from '../ContextFiles/LoginContext'
import axiosInstance from '../Axios'
import { Form, Button } from 'react-bootstrap'

function Login(props) {

  // console.log("TOP OF LOGIN", JSON.stringify(localStorage))

  const navigate = useNavigate()

    const {setLoginStatus} = useContext(LoginContext)
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

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
              console.log("RES=",res)
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
              console.log("LOGIN RES", res)
              localStorage.setItem('user_id', res.data.id)
              localStorage.setItem('username', login.username)
              setLoginStatus(true)
              navigate('/')
            })
        })
        .catch(error => console.error)
    }

    return (
        <div className='form login-form'>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} className='d-grid gap-2'>
                <Form.Control type='text' name='username' placeholder='Username' value={login.username} onChange={handleChange}></Form.Control>
                <Form.Control type='password' name='password' placeholder='Password' value={login.password} onChange={handleChange}></Form.Control>
                <Button type='submit'>Login</Button>      
            </Form>
            <div className='form-footer'>
                <p>Don't have an account yet?</p>
                <Button href='/signup/'type="button" variant='link'>Sign-Up</Button>
            </div>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../Axios'
import { Form, Button, Alert } from 'react-bootstrap'
import {RiAlertFill} from 'react-icons/ri'


function Register(props) {

    const navigate = useNavigate()

    const [errorResponse, setErrorResponse] = useState(false)
    const [form, setForm] = useState({
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
  })

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    // Submit form
    async function handleSubmit(event) {
        event.preventDefault()
        await axiosInstance.post('/users/create',
        {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
            password: form.password,
        })
        // Then, log the newly made user in 
        .then((res) => {
            localStorage.setItem('username', form.username)
            localStorage.setItem('user_id', res.data.id)
            axiosInstance.post('token/obtain/', {
                username: form.username,
                password: form.password
            })
            .then(res => {
                axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
                localStorage.setItem('access_token', res.data.access)
                localStorage.setItem('refresh_token', res.data.refresh)
                navigate('/')
                return res
            })
        })
        .catch(error => {
            const errRes = error.request.response
            if (errRes.includes('duplicate key value violates unique constraint') && errRes.includes('username')) {
                setErrorResponse('username')
            } else {
                setErrorResponse(true)
            }
            console.error(error)
        })
    }


    return (
        <div className='form signup-form'>
            <h1>Register</h1>

            {errorResponse==='username'  
                ? <Alert variant='warning'><RiAlertFill /> That username is already taken.</Alert>
                : errorResponse 
                    ? <Alert variant='warning'><RiAlertFill /> Sorry, there was a problem registering your account. Please try again.</Alert> 
                    : null
            }

            <Form onSubmit={handleSubmit} className='d-grid'>
                <div className='d-grid'> 
                <Form.Group className='d-grid gap-2'>
                    <Form.Control type='email' required
                      id='email' name='email' placeholder='Email'
                      value={form.email} onChange={handleChange}>
                    </Form.Control> 
                    <Form.Control type='text' required
                      id='first_name' name='first_name' placeholder='First Name'
                      value={form.first_name} onChange={handleChange}>
                    </Form.Control>
                    <Form.Control type='text' required
                      id='last_name' name='last_name' placeholder='Last Name'
                      value={form.last_name} onChange={handleChange}>
                    </Form.Control>
                    <Form.Control type='text' required
                      id='username' name='username' placeholder='Username'
                      value={form.username} onChange={handleChange}>
                    </Form.Control>
                    <Form.Control type='password' required minlength='8'
                      id='password' name='password' placeholder='Password (at least 8 characters)'
                      value={form.password} onChange={handleChange}>
                    </Form.Control>
                    <Button type='submit'>Register</Button>                
                </Form.Group>
                </div>
            <div className="form-footer">
                <p>Have an account already?</p>
                <Button href='/login/'type="button" variant='link'>Log In</Button>
                </div>

            </Form>
        </div>
    );
}

export default Register;
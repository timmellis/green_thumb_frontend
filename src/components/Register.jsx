import React, { useState, useContext } from 'react';
import axiosInstance from '../Axios'
import { Form, Button } from 'react-bootstrap'
import {LoginContext} from '../ContextFiles/LoginContext'

function Register(props) {

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
                return res
            })
        })
        .catch(error => console.error)
    }

    // const submit=document.querySelector('#submit');
    // submit.addEventListener('click',()=>{
    //     const email = document.querySelector('#email');

    //     if(email.validity.typeMismatch){
    //         email.setCustomValidity('Please enter correct email');
    //     } else {
    //         email.setCustomValidity('');
    //     }
    // })

    return (
        <div className='form signup-form'>
            <h1>Register</h1>
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
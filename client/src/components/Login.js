import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const Login = (props) => {

    const [formData, setFormData] = useState({
        credentials: {
            username: '',
            password: ''
        },
        isFetching: false
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            credentials: {
                ...formData.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    const login = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', formData.credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/colors')
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={login}>
            <input
                type="text"
                name="username"
                value={formData.credentials.username}
                placeholder="Username"
                onChange={onChange}
                className="friendInput"
            />
            <input
                type="password"
                name="password"
                value={formData.credentials.password}
                placeholder="Password"
                onChange={onChange}
                className="friendInput"
            />
            <button className="friendInput">
                Log in
            </button>
        </form>
    )
}

export default Login;
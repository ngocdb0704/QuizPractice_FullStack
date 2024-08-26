import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function AddUser() {

    const { fetchUsers } = useContext(UserContext);

    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const { name, username, email } = user;

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/user', user);
        fetchUsers();
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>
                        Register User
                    </h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>
                                Name
                            </label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>
                                Username
                            </label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                name='username'
                                value={username}
                                onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your email'
                                name='email'
                                value={email}
                                onChange={(e) => handleInputChange(e)} />
                        </div>
                        <button type='submit'
                            className='btn btn-outline-primary'>
                            Submit
                        </button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

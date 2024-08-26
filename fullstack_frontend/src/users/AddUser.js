import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as Icon from 'react-bootstrap-icons';

export default function AddUser() {

    const { fetchUsers, statuses, roles } = useContext(UserContext);

    const [alert, showAlert] = useState(false);
    const [roleSelected, setRoleSelected] = useState(true);
    const [statusSelected, setStatusSelected] = useState(true);

    // let navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        gender: true,
        email: "",
        mobile: "",
        role: "",
        status: ""
    });

    const { fullName, gender, email, mobile, role, status } = user;

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role.length === 0 || status.length === 0) {
            showAlert(true);
            if (role.length === 0) setRoleSelected(false);
            if (status.length === 0) setStatusSelected(false);
        }
        if (alert === false) {
            await axios.post('http://localhost:8080/user', user);
            fetchUsers();
            // navigate('/');
            setUser(
                {
                    fullName: "",
                    gender: true,
                    email: "",
                    mobile: "",
                    role: "",
                    status: ""
                }
            )
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div class="alert alert-danger my-3 col-md-6 offset-md-3 border rounded"
                    role="alert"
                    style={{ display: (alert) ? 'block' : 'none' }}>
                    <Icon.ExclamationTriangle /> Something is missing... Please check again!
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>
                        Register User
                    </h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='fullName'
                                className='form-label'>
                                Full Name
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <Icon.Person />
                                </span>
                                <input type='text'
                                    required
                                    className='form-control'
                                    placeholder='Enter full name'
                                    name='fullName'
                                    value={fullName}
                                    onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <Icon.Envelope />
                                </span>
                                <input type='email'
                                    required
                                    className='form-control'
                                    placeholder='Enter email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='mobile' className='form-label'>
                                Phone Number
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <Icon.Telephone />
                                </span>
                                <input type='tel'
                                    required
                                    className='form-control'
                                    placeholder='Enter phone number'
                                    pattern="^(0)[0-9]{2}[0-9]{2}[0-9]{5}$"
                                    name='mobile'
                                    value={mobile}
                                    onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='mb-3'>
                                        <label htmlFor='gender'
                                            className='form-label'>
                                            Gender
                                        </label>
                                        <div className='container'>
                                            <div className='text-start my-1'>
                                                <input className="form-check-input"
                                                    name='gender'
                                                    type="radio"
                                                    id="genderBox"
                                                    checked={user.gender}
                                                    onChange={(e) => {
                                                        setUser({ ...user, gender: true })
                                                    }}
                                                />
                                                <label className="form-check-label mx-3"
                                                    for="genderBox">
                                                    Male
                                                    <Icon.GenderMale
                                                        className='mx-4'
                                                        color='blue'
                                                        size={20}
                                                    />
                                                </label>
                                            </div>
                                            <div className='text-start my-2'>
                                                <input className="form-check-input"
                                                    name='gender'
                                                    type="radio"
                                                    id="genderBox"
                                                    checked={!user.gender}
                                                    onChange={(e) => {
                                                        setUser({ ...user, gender: false })
                                                    }}
                                                />
                                                <label className="form-check-label mx-3"
                                                    for="genderBox">
                                                    Female
                                                    <Icon.GenderFemale
                                                        className='mx-2'
                                                        color='red'
                                                        size={20}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='mb-3' style={{ border: (roleSelected) ? '' : 'solid red' }}>
                                        <label htmlFor='role' className='form-label'>
                                            Role
                                        </label>
                                        <select class="form-select"
                                            name='role'
                                            required
                                            onChange={(e) => handleInputChange(e)}>
                                            <option selected={(role === '')} disabled
                                            >
                                                Choose a role
                                            </option>
                                            {roles.map(elementRole => {
                                                return (
                                                    <option
                                                    >
                                                        {elementRole}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='mb-3' style={{ border: (statusSelected) ? '' : 'solid red' }}>
                            <label htmlFor='status' className='form-label'>
                                Status
                            </label>
                            <select class="form-select"
                                name='status'
                                required
                                onChange={(e) => handleInputChange(e)}>
                                <option selected={(status === '')} disabled
                                >
                                    Choose a status
                                </option>
                                {statuses.map(elementStatus => {
                                    return (
                                        <option>
                                            {elementStatus}
                                        </option>
                                    )
                                })}
                            </select>
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

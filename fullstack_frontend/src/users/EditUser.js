import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as Icon from 'react-bootstrap-icons';
export default function EditUser() {

    const { fetchUsers, roles, statuses } = useContext(UserContext);

    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        fullName: "",
        gender: "",
        email: "",
        mobile: "",
        role: "",
        status: ""
    });

    const { fullName, gender, email, mobile, role, status } = user;

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user);
        fetchUsers();
        navigate('/');
    }

    return (
        //fix this background
        <div className='py-5 bg-danger bg-opacity-50'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow bg-white'>
                        <h2 className='text-center m-4'>
                            Edit User
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
                                        className='form-control'
                                        required
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
                                        className='form-control'
                                        placeholder='Enter email'
                                        name='email'
                                        readOnly
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
                                        className='form-control'
                                        readOnly
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
                                                        htmlFor="genderBox">
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
                                                        htmlFor="genderBox">
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
                                        <div className='mb-3'>
                                            <label htmlFor='role' className='form-label'>
                                                Role
                                            </label>
                                            <select class="form-select" name='role' onChange={(e) => handleInputChange(e)}>
                                                {roles.map(elementRole => {
                                                    return (
                                                        <option
                                                            selected={(elementRole === role)}
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


                            <div className='mb-3'>
                                <label htmlFor='status' className='form-label'>
                                    Status
                                </label>
                                <select class="form-select" name='status' onChange={(e) => handleInputChange(e)}>
                                    {statuses.map(elementStatus => {
                                        return (
                                            <option
                                                selected={(elementStatus === status)}
                                            >
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
        </div>
    )
}

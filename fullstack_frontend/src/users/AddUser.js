import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as Icon from 'react-bootstrap-icons';


export default function AddUser() {

    const { fetchUsers, statuses, roles } = useContext(UserContext);

    const [alert, showAlert] = useState(false);
    const [alertEmail, showAlertEmail] = useState(false);
    const [alertMobile, showAlertMobile] = useState(false);
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
        const checkDuplicatedEmail = await axios.get(`http://localhost:8080/user/existEmail/${user.email}`);
        const checkDuplicatedMobile = await axios.get(`http://localhost:8080/user/existMobile/${user.mobile}`);
        if (checkDuplicatedEmail.data || checkDuplicatedMobile.data) {
            showAlert(true)
            if (checkDuplicatedEmail.data) showAlertEmail(true);
            if (checkDuplicatedMobile.data) showAlertMobile(true);
        }
        else {
            await axios.post('http://localhost:8080/user', user)
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
            showAlert(false);
            showAlertEmail(false);
            showAlertMobile(false);
        }
    }

    return (
        <div className='py-5' style={{ backgroundImage: "url(backGround.png)" }}>
            <div className='container'>
                <div className='row'>
                    <div className="alert alert-danger my-3 col-md-6 offset-md-3 border rounded"
                        role="alert"
                        style={{ display: (alert) ? 'block' : 'none' }}>
                        <Icon.ExclamationTriangle /> Something is wrong... Please check again!
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundImage: "url(addFormBackground.png)" }}>
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

                            <div className='mb-3' style={{ border: (alertEmail) ? 'solid red' : '' }}>
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
                                <div className='text-bg-danger' style={{ visibility: (alertEmail) ? 'visible' : 'hidden' }}>
                                    Email has already been used
                                </div>
                            </div>
                            <div className='mb-3' style={{ border: (alertMobile) ? 'solid red' : '' }}>
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
                                <div className='text-bg-danger' style={{ visibility: (alertMobile) ? 'visible' : 'hidden' }}>
                                    Phone number has already been used
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
                                            <select className="form-select"
                                                defaultValue={role}
                                                name='role'
                                                required
                                                onChange={(e) => handleInputChange(e)}>
                                                <option value={role} disabled
                                                >
                                                    Choose a role
                                                </option>
                                                {roles.map((elementRole, index) => {
                                                    return (
                                                        <option key={index} value={elementRole}
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
                                <select className="form-select"
                                    name='status'
                                    defaultValue={role}
                                    required
                                    onChange={(e) => handleInputChange(e)}>
                                    <option value={role} disabled
                                    >
                                        Choose a status
                                    </option>
                                    {statuses.map((elementStatus, index) => {
                                        return (
                                            <option key={index} value={elementStatus}>
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

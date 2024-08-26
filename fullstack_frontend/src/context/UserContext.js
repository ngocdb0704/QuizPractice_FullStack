import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        const response = await axios.get('http://localhost:8080/user/status');
        setStatuses(response.data);
    }

    const fetchRoles = async () => {
        const response = await axios.get('http://localhost:8080/user/roles');
        setRoles(response.data);
    }

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data);
    };

    return (
        <UserContext.Provider value={
            {
                users, 
                fetchUsers, 
                setUsers, 
                roles, 
                setRoles,
                statuses,
                setStatuses
            }
        }>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

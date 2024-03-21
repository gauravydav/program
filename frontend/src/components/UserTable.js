import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
        name: '',
        lastname: '',
        email: '',
        mobile: '',
        project: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditedUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            project: user.project
        });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.patch(`${config.apiUrl}/users/${editingUser._id}`, editedUserData);
          
            fetchUsers();
           
            setEditingUser(null);
            setEditedUserData({
                name: '',
                lastname: '',
                email: '',
                mobile: '',
                project: ''
            });
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/users/${id}`);
          
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="w-full px-6 py-4">
            <h2 className="text-xl font-bold mb-4">Clients</h2>
            <table className="w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Lastname</th>
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Mobile</th>
                        <th className="text-left py-2 px-4">Project</th>
                        <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedUserData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={editedUserData.lastname}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.lastname
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        name="email"
                                        value={editedUserData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={editedUserData.mobile}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.mobile
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        type="text"
                                        name="project"
                                        value={editedUserData.project}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.project
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUser && editingUser._id === user._id ? (
                                    <button className="text-green-500" onClick={handleSaveEdit}>Save</button>
                                ) : (
                                    <>
                                        <button className="text-blue-500 mr-2" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="text-red-500" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

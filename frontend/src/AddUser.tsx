import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
}

const AddUser = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`);
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Unexpected response data', response.data);
            }
        } catch (error) {
            console.error('Ошибка при получении пользователей', error);
        }
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<User>(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, { name, email });
            console.log({response})
            setUsers([...users, response.data]);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Ошибка при добавлении пользователя', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter user name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter user email"
                />
                <button type="submit">Add User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>name: {user.name} (email: {user.email}, id: {user.id})</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddUser;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserDetails: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get<User>(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`); // Получение пользователя из API
            setUser(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователя', error);
        }
    };

    return (
        <div>
            <h1>Get User</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={userId}
                    onChange={handleInputChange}
                    placeholder="Enter user ID"
                />
                <button type="submit">Get User</button>
            </form>
            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserDetails;

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/add-user">Add User</Link>
                    </li>
                    <li>
                        <Link to="/get-user">Get User</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

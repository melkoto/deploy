import {Route, Routes} from 'react-router-dom';
import Header from './Header';
import AddUser from './AddUser';
import GetUser from './UserDetails';

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/add-user" element={<AddUser/>}/>
                <Route path="/get-user" element={<GetUser/>}/>
            </Routes>
        </>
    );
};

export default App;

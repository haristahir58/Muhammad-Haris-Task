import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import UserList from './Admin/User/UserList';
import AddUser from './Admin/User/AddUser';
import Home from './Admin/Home/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/users' element={<UserList/>}></Route>
        <Route exact path='/user/new' element={<AddUser/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;

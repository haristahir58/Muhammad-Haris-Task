import React, { useState, useEffect } from 'react';
import './userlist.css'
import Sidebar from '../Sidebar/Sidebar';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('ALL');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = () => {
    if (selectedUserId === 'ALL') {
      setFilteredUsers(users);
    } else {
      const selectedUser = users.find(user => user._id == selectedUserId);
      setFilteredUsers(selectedUser ? [selectedUser] : []);
    }
  };

  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
    <div className="container">
      <form className="search-form" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
      <label htmlFor="searchUser" className="search-label">Search User:</label>
<select id="searchUser" name="searchUser" value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="search-select">
  <option value="ALL">All</option>
  {users.map(user => (
    <option key={user._id} value={user._id}>{user.name}</option>
  ))}
</select>

<button type="submit" className="search-button">Search</button>

      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Cell#</th>
            <th>Age</th>
            <th>Created At</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user,index) => (
            <tr key={user._id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cellNumber}</td>
              <td>{user.age}</td>
              <td>{user.createdAt}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default UserList;

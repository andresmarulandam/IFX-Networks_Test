import { useEffect, useState } from 'react';
import fetchData from '../../utils/axiosConfig';

import DataTable from 'react-data-table-component';
import ExpandedComponent from '../ExpandedComponent/ExpandedComponent';

import { FaUserPlus } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';

function Table() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData.get('/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await fetchData.post('/users', userData);
      console.log('Usuario agregado');
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  };

  const handleEditUser = async (userId) => {
    try {
      await fetchData.put(`/users/${userId}`, updatedUserData);
      console.log('Usuario editado');
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, ...updatedUserData };
        }
        return user;
      });
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error al editar usuario', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetchData.delete(`users/${userId}`);
      console.log('Usuario eliminado');
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.name.firstname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.name.lastname,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.username,
    },
    {
      name: 'Actions',

      cell: (row) => (
        <>
          <div>
            <button onClick={() => handleAddUser(row.id)}>
              <FaUserPlus size={18} />
            </button>
            <button onClick={() => handleEditUser(row.id)}>
              <FaUserEdit size={18} />
            </button>
            <button onClick={() => handleDeleteUser(row.id)}>
              <FaUserTimes size={18} />
            </button>
          </div>
        </>
      ),
    },
  ];

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = users.filter((user) => {
      return (
        user.name.firstname.toLowerCase().includes(searchValue) ||
        user.name.lastname.toLowerCase().includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue)
      );
    });
    setFilteredUsers(filteredData);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="Search user.." />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <DataTable
          title="User List"
          columns={columns}
          data={filteredUsers}
          pagination
          fixedHeader
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      )}
    </div>
  );
}

export default Table;

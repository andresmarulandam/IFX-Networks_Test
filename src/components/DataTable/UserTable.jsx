import { useEffect, useState } from 'react';
import fetchData from '../../utils/axiosConfig';

import DataTable from 'react-data-table-component';
import ExpandedComponent from '../ExpandedComponent/ExpandedComponent';

import { FaUserPlus } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const [showModal, setShowModal] = useState(false);

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

  const handleInputChange = (e, field) => {
    setUpdatedUserData({ ...updatedUserData, [field]: e.target.value });
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    setShowModal(true);
    const userToEdit = users.find((user) => user.id === userId);
    setUpdatedUserData(userToEdit);
  };

  const handleUpdateUser = async () => {
    try {
      await fetchData.put(`/users/${editingUserId}`, updatedUserData);
      console.log('Usuario editado');
      const updatedUsers = users.map((user) => {
        if (user.id === editingUserId) {
          return { ...user, ...updatedUserData };
        }
        return user;
      });
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setShowModal(false);
    } catch (error) {
      console.error('Error al editar usuario', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedUserData({});
    setEditingUserId(null);
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
            <button
              style={{ marginRight: '10px' }}
              onClick={() => handleAddUser(row.id)}
            >
              <FaUserPlus size={18} />
            </button>
            <button
              style={{ marginRight: '10px' }}
              onClick={() => handleEditUser(row.id)}
            >
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
        <>
          <DataTable
            title="User List"
            columns={columns}
            data={filteredUsers}
            pagination
            fixedHeader
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          />
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Username</h3>
              <input
                type="text"
                value={updatedUserData.username || ''}
                onChange={(e) => handleInputChange(e, 'username')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateUser}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default UserTable;

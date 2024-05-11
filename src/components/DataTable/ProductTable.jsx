import { useEffect, useState } from 'react';
import fetchData from '../../utils/axiosConfig';

import DataTable from 'react-data-table-component';
import ExpandedComponent from '../ExpandedComponent/ExpandedComponent';

import { IoIosAddCircle } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await fetchData.post('/products', productData);
      console.log('Producto agregado');
    } catch (error) {
      console.error('Error al agregar producto', error);
    }
  };

  const handleInputChange = (e, field) => {
    setUpdatedProductData({ ...updatedProductData, [field]: e.target.value });
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setShowModal(true);
    const userToEdit = users.find((product) => product.id === productId);
    setUpdatedProductData(productToEdit);
  };

  const handleUpdatedProduct = async () => {
    try {
      await fetchData.put(`/products/${editingProductId}`, updatedProductData);
      console.log('Producto editado');
      const updatedProducts = products.map((product) => {
        if (product.id === editingProductId) {
          return { ...product, ...updatedProductData };
        }
        return product;
      });
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error al editar producto', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedProductData({});
    setEditingProductId(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetchData.delete(`products/${productId}`);
      console.log('Producto eliminado');
      const updatedProducts = products.filter(
        (product) => product.id !== productId,
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const columns = [
    {
      name: 'Product',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
    },
    {
      name: 'Actions',

      cell: (row) => (
        <>
          <div>
            <button
              style={{ marginRight: '10px' }}
              onClick={() => handleAddProduct(row.id)}
            >
              <IoIosAddCircle size={18} />
            </button>
            <button
              style={{ marginRight: '10px' }}
              onClick={() => handleEditProduct(row.id)}
            >
              <MdModeEditOutline size={18} />
            </button>
            <button onClick={() => handleDeleteProduct(row.id)}>
              <MdDeleteForever size={18} />
            </button>
          </div>
        </>
      ),
    },
  ];

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
      );
    });
    setFilteredProducts(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search product.."
      />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <>
          <DataTable
            title="Product List"
            columns={columns}
            data={filteredProducts}
            pagination
            fixedHeader
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          />
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>title</h3>
              <input
                type="text"
                value={updatedProductData.title || ''}
                onChange={(e) => handleInputChange(e, 'title')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdatedProduct}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ProductTable;

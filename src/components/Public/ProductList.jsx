import { useEffect, useState } from 'react';
import fetchData from '../../utils/axiosConfig';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>Product:</strong>
            {product.title} <br />
            {product.description} <br />
            {product.price} <br />
            {product.category} <br />
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

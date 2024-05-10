import { useEffect, useState } from 'react';

import Header from '../components/HeaderBar/Header';
import SearchInput from '../components/SearchBar/SearchInput';
import CartButton from '../components/CartButton/CartButton';
import CardBody from '../components/CardBody/CardBody';

import fetchData from '../utils/axiosConfig';

import './HomePage.css';
import LoginButton from '../components/LoginButton/LoginButton';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchData.get('/products');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchItems();
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItems([...itemArr, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <div className="search-container">
              <SearchInput
                products={items}
                value={searchValue}
                onChangeData={changingSearchData}
              />
            </div>

            <div>
              <LoginButton />
            </div>
            <div>
              <CartButton num={addedItems.length} click={setShowAddProducts} />
              <span className="cart-text">Cart</span>
            </div>
          </div>
        </div>

        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
}

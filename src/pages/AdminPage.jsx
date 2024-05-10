import { useState } from 'react';

import UserTable from '../components/DataTable/UserTable';
import ProductTable from '../components/DataTable/ProductTable';
import Header from '../components/HeaderBar/Header';

import './AdminPage.css';

export default function AdminPage() {
  const [showProducts, setShowProducts] = useState();
  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header title="Admin Dashboard" />
          <div className="nav-right">
            <div>
              <button
                className={`tab-btn ${showProducts ? '' : 'active'}`}
                onClick={() => setShowProducts(true)}
              >
                Products List
              </button>
              <button
                className={`tab-btn ${showProducts ? 'active' : ''}`}
                onClick={() => setShowProducts(false)}
              >
                Users List
              </button>
            </div>
          </div>
        </div>
        {showProducts ? <ProductTable /> : <UserTable />}
      </div>
    </div>
  );
}

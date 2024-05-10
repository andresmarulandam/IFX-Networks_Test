import Table from '../components/DataTable/Table';
import Header from '../components/HeaderBar/Header';
import { IoIosAddCircle } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

import './AdminPage.css';

export default function AdminPage() {
  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header title="Admin Dashboard" />
          <div className="nav-right">
            <div>
              <IoIosAddCircle />
              <span>Add Product</span>
            </div>
            <div>
              <MdModeEditOutline />
              <span>Edit Product</span>
            </div>
            <div>
              <MdDeleteForever />
              <span>Delete Product</span>
            </div>
          </div>
        </div>

        <Table />
      </div>
    </div>
  );
}

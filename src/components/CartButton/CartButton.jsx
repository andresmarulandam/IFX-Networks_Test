import './CartButton.css';
import { FaShoppingCart } from 'react-icons/fa';

const CartButton = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      <span className="cart-num">{num}</span>
      <FaShoppingCart className="cart-icon" color="black" size={30} />
    </button>
  );
};

export default CartButton;

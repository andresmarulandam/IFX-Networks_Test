import './LoginButton.css';

import { FaUserAlt } from 'react-icons/fa';

const LoginButton = ({ num, click }) => {
  return (
    <button className="ui-change-btn">
      <FaUserAlt color="black" size={30} />
    </button>
  );
};

export default LoginButton;

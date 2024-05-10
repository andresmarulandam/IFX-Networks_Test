import { useNavigate } from 'react-router-dom';

import './LoginButton.css';
import { FaUserAlt } from 'react-icons/fa';

const LoginButton = () => {
  const navigate = useNavigate();

  function onLoginPage() {
    navigate('/login');
  }

  return (
    <button onClick={onLoginPage} className="ui-change-btn">
      <FaUserAlt color="black" size={30} />
      <span className="login-text">Login</span>
    </button>
  );
};

export default LoginButton;

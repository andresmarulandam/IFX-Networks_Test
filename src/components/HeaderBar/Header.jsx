import './Header.css';
import logo from '../../assets/logo.jpg';

function Header() {
  return (
    <header>
      <img className="header-logo" src={logo} alt="logo" />
      <h1 className="title"> IFX STORE</h1>
    </header>
  );
}

export default Header;

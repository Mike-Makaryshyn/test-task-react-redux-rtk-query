import logo from "../../assets/Logo.svg";
import "./header.scss";


const Header = ({ onUserClick, onSingUpClick }) => {

  const handleClick = () => {
   window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
 };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner dynamic-padding">
          <div onClick={handleClick} className="header-img">
            <img src={logo} alt="" />
          </div>
          <div className="header-btns">
            <button type="button" onClick={onUserClick} className="regular-btn users-btn">
              Users
            </button>
            <button type="button" onClick={onSingUpClick} className="regular-btn sing-up-btn">
              Sing up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

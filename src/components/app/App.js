import Header from "../header/Header";
import UsersList from "../usersList/UsersList";
import FrontSetion from "../frontSection/FrontSection";
import CreateUserForm from "../createUserForm/CreateUserForm";

import { useRef } from "react";

function App() {
  const userRef = useRef(null);
  const singUpRef = useRef(null);

  const handleButtonClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <Header 
         onUserClick={()=> handleButtonClick(userRef)} 
         onSingUpClick={()=> handleButtonClick(singUpRef)}
      />

      <div className="container">
        <FrontSetion onSingUpClick={()=> handleButtonClick(singUpRef)} />
        <div className="dynamic-padding">
          <UsersList userRef={userRef}/>
          <CreateUserForm singUpRef={singUpRef}/>
        </div>
      </div>
    </div>
  );
}

export default App;

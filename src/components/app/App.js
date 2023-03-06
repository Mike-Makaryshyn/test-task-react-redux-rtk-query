import Header from "../header/Header";
import UsersList from "../usersList/UsersList";
import FrontSetion from "../frontSection/FrontSection";
import CreateUserForm from "../createUserForm/CreateUserForm";
import { useCreateUserMutation } from "../../redux/apiSlice";

import { useRef } from "react";

function App() {
  const userRef = useRef(null);
  const singUpRef = useRef(null);

  const [
    createUser,
    {
      isSuccess: isSuccessForm,
      isLoading: isLoadingForm,
      isError: isErrorForm,
      error: errorForm,
    },
  ] = useCreateUserMutation();

  const handleButtonClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <Header
        onUserClick={() => handleButtonClick(userRef)}
        onSingUpClick={() => handleButtonClick(singUpRef)}
      />

      <main className="container">
        <FrontSetion onSingUpClick={() => handleButtonClick(singUpRef)} />
        <div className="requests-components dynamic-padding">
          <UsersList userRef={userRef} isSuccessForm={isSuccessForm} />
          <CreateUserForm
            createUser={createUser}
            isSuccess={isSuccessForm}
            isLoading={isLoadingForm}
            isError={isErrorForm}
            error={errorForm}
            singUpRef={singUpRef}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

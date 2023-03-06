import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../redux/apiSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Spinner from "../spinners/Spinner";
import Error from "../error/Error";
import UserItem from "./UsersItem";

import './user-list.scss';

const UsersList = ({userRef, isSuccessForm}) => {
  const [page, setPage] = useState(1);
  const [allShownUsers, setAllShownUsers] = useState([]);

  const {
    data: usersData = {},
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(page);

  const { data: firstPageData = {} } = useGetUsersQuery(1);

  useEffect(() => {
    if (isSuccess) {
      setAllShownUsers((prevUsers) => [...prevUsers, ...usersData.users]);
    }
  }, [usersData, isSuccess]);

  useEffect(() => {
    if (isSuccessForm && page === 1) {
      setAllShownUsers(() => [...usersData.users]);
    }
  }, [usersData.users, page, isSuccessForm, firstPageData]);

  useEffect(() => {
   if (isSuccessForm && page > 1) {
      setAllShownUsers((prev)=> [firstPageData.users[0], ...prev.slice(0, -1)] )
    }
  }, [page, isSuccessForm, firstPageData]);


  const loadMore = () => {
    if (page !== usersData.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  if (isError) return <Error />

  const renderUsersList = (users) => {
    return users.map((user) => {
      return (
        <CSSTransition key={user.id} timeout={500} classNames="user">
          <UserItem user={user}/>
        </CSSTransition>
      );
    });
  };

  const sortedUsers = allShownUsers.sort((a,b)=> b.registration_timestamp - a.registration_timestamp);

  const usersListElements = renderUsersList(sortedUsers);

  return (
    <section className="user-list__section" ref={userRef}>
      <h2 className="user-list__title title">Working with GET request</h2>

      {isLoading ? <Spinner /> : null}
      
      <TransitionGroup className="users-wrapper" component="ul">
         {usersListElements}
      </TransitionGroup>

      {page !== usersData.total_pages ? (
        <button type="button" className="regular-btn" onClick={loadMore}>Show more</button>
      ) : null}
    </section>
  );
};

export default UsersList;

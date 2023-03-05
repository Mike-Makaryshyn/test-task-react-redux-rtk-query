import { useState } from "react";
import { renderText, renderToolkit } from '../../utils/shortText';

const UserItem = ({user}) => {

   const [isNameHover, setIsNameHover] = useState(false);
   const [isEmailHover, setIsEmailHover] = useState(false);

   return (
      <li className="user-item" key={user.id}>
         <img className="avatar" src={user.photo} alt="avatar"></img>
         <div 
            style={{position: 'relative'}} 
            className="user-name"
            onMouseLeave={()=> setIsNameHover(()=> false)}
            onMouseEnter={()=> setIsNameHover(()=> true)}
         >
            {renderText(user.name)}
            {renderToolkit(isNameHover, user.name)}
         </div>
         <div className="user-position">
            {user.position}
         </div>
         <div 
            style={{position: 'relative'}}
            className="user-email"
            onMouseLeave={()=> setIsEmailHover(()=> false)}
            onMouseEnter={()=> setIsEmailHover(()=> true)}
         >
            {renderText(user.email)}
            {renderToolkit(isEmailHover, user.email)}
         </div>
         <div className="user-phone">{user.phone}</div>
      </li>
   )
}

export default UserItem;
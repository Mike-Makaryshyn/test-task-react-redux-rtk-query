import { useState, useEffect, useRef } from "react";
import Positions from "../positions/Positions";
import successImg from '../../assets/success-image.svg'

import {
  useCreateUserMutation,
  useGetPositionsQuery,
  useGetTokenQuery,
} from "../../redux/apiSlice";

import './create-user.scss';

const CreateUserForm = ({ singUpRef }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState(1);
  const [fileInfo, setFileInfo] = useState({});
  const maxTextLength = 26;

  const [isFileNameHover, setIsFileNameHover] = useState(false);
  const successBlockRef = useRef();

  const [createUser, {isError, isSuccess, error }] = useCreateUserMutation();
  const { data: tokenData } = useGetTokenQuery();

  const {
    data: positions = [],
    isSuccess: isPosSucces,
  } = useGetPositionsQuery();

  useEffect(() => {
   if (!isError) {
     setUserName("");
     setUserEmail("");
     setUserPhone("");
     setSelectedPosition("");
     setSelectedPositionId(1);
     setFileInfo({});
   }

 }, [isError]);

  useEffect(() => {
   if(isSuccess) {
      singUpRef.current.style.display = 'none';
      successBlockRef.current.style.display = 'flex';

      setTimeout(()=> {
         singUpRef.current.style.display = 'block';
         successBlockRef.current.style.display = 'none';
      }, 3000)
   }

 // eslint-disable-next-line
 }, [isSuccess]);

  const appendNewUserData = (formData) => {
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("phone", userPhone);
    formData.append("position", selectedPosition);
    formData.append("position_id", selectedPositionId);
    formData.append("photo", fileInfo);
  };

  const onCreateFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    appendNewUserData(formData);

    createUser({ formData, token: tokenData.token });
  };

  function onPositionChange(e) {
    setSelectedPositionId(e.target.getAttribute("custom"));
    setSelectedPosition(e.target.value);
  }

  const onFileChange = ({ target: { files } }) => {
    const file = files[0];
    setFileInfo(() => file);
  };

  const renderFileName = (text) => {
   if(fileInfo && fileInfo.name && fileInfo.name.length > maxTextLength) {
      return `${fileInfo.name.slice(0,  maxTextLength)}...`;
   }

   return text ? text : 'Upload your photo';
  }

  const renderFileToolkit = (isElHover, text) => {
   if (isElHover && text && text.length > maxTextLength) {
     return <span className="toolkit">{text ? text : 'Upload your photo'}</span>;
   }
 };


  return (
   <>
   <section className="create-user" ref={singUpRef}>
      <div className="center">
        <h2 className="title">Working with POST request</h2>
      </div>
      <form className="create-user__form" onSubmit={onCreateFormSubmit} noValidate action="#">
            <input
               type="text"
               className="create-user__text-input"
               required
               name="name"
               value={userName}
               placeholder="Your name"
               onChange={(e) => setUserName(e.target.value)}
            />
            <input
               type="email"
               className="create-user__text-input"
               required
               name="email"
               value={userEmail}
               placeholder="Email"
               onChange={(e) => setUserEmail(e.target.value)}
            />
         
            <input
               id="phone"
               type="tel"
               className="create-user__text-input phone"
               required
               name="phone"
               placeholder="Phone"
               value={userPhone}
               onChange={(e) => setUserPhone(e.target.value)}
            />
            <label className="label-phone" htmlFor="phone">
               +38 (XXX) XXX - XX - XX
            </label>

            {isError ? <div style={{color: 'red'}}>{error.data.message}</div>: null}

            <div className="radio-wrapper">
               <Positions 
                  positions={positions.positions} 
                  onPositionChange={onPositionChange}
                  isPosSucces={isPosSucces}
               />
            </div>
            
            <label htmlFor="file-upload" className="custom-file-upload">
              <span className="upload-mark">Upload</span> 
              <span 
                  className="filename"
                  onMouseLeave={()=> setIsFileNameHover(()=> false)}
                  onMouseEnter={()=> setIsFileNameHover(()=> true)}
               >
               {renderFileName(fileInfo.name)}
              </span>
               {renderFileToolkit(isFileNameHover, fileInfo.name)}
            </label>

            <input
               className="create-user__file-input file"  
               id="file-upload"
               type="file"
               required 
               onChange={onFileChange}
            />

            <div className="center">
                <button className="disabled-btn" type="submit">Sign up</button>
            </div>
         </form>
         
   </section>
   <div ref={successBlockRef} className="success-block">
      <h3 className="success-title title">User successfully registered</h3> 
      <img src={successImg} alt="" />
   </div>
    </>
  );
};

export default CreateUserForm;

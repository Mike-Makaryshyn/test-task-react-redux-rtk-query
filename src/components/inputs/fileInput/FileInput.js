import React,{ useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import { ErrorMessage } from "formik";
import styles from "./file-input.module.scss";

const FileInput = ({ setFieldValue,errors,touched, keyObj }) => {
   const [fileName, setFileName] = useState('Upload your photo');
   const [fullFileName, setFullFileName] = useState('');

   const redErrorMessage = classNames({
      [styles.errorMessage]: errors.photo && touched.photo,
   });

   const [isFileNameHover,setIsFileNameHover] = useState(false);
   const maxTextLength = 26;


   const setFileNames = (file) => {
      if (
         file &&
         file.name &&
         file.name.length > maxTextLength
      ) {
         setFileName(()=> `${file.name.slice(0, maxTextLength)}...`);
         setFullFileName(file.name)
      } else if (file && file.name && file.name.length <= maxTextLength) {
         setFileName(()=> `${file.name}`);
      } else {
         setFileName(()=> 'Upload your photo');
      }
   };
   

   return (
      <div className="input-file__wrapper">
         <label htmlFor="file-upload" className="custom-file-upload">
            <span className="upload-mark">Upload</span>
            <span
               className="filename"
               onMouseLeave={() => setIsFileNameHover(() => false)}
               onMouseEnter={() => setIsFileNameHover(() => true)}
            >
               {fileName}
            </span>
            <CSSTransition
                  in={fileName !== "Upload your photo" && isFileNameHover && fileName.length > maxTextLength}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                  >
               <span className="toolkit file">{fullFileName}</span>
            </CSSTransition>

         </label>
         <input
            className="custom-file-upload"
            id="file-upload"
            name="photo"
            type="file"
            accept=".jpg, .jpeg"
            onChange={(event) => {
               setFieldValue("photo", event.target.files[0]);
               setFileNames(event.target.files[0]);
            }}
         />
         {errors.photo && (
               <ErrorMessage name="photo">
                  {(msg) => <div className={redErrorMessage}>{msg}</div>}
               </ErrorMessage>
            )}
      </div>
   );
};

export default FileInput;

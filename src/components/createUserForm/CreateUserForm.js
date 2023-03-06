import { useEffect, useRef } from "react";
import successImg from "../../assets/success-image.svg";
import singUpSchema from "../../utils/schemaValidation";
import { Form, Formik } from "formik";

import InputForm from '../inputs/inputForm/InputForm';
import FileInput from '../inputs/fileInput/FileInput';
import RadioInputs from '../inputs/radioInputs/RadioInputs';
import Spinner from "../spinners/Spinner";

import { useCreateUserMutation, useGetTokenQuery } from "../../redux/apiSlice";

import "./create-user.scss";

const CreateUserForm = ({ singUpRef }) => {
  const successBlockRef = useRef();

  const [createUser, { isSuccess, isLoading, isError, error }] = useCreateUserMutation();
  const { data: tokenData } = useGetTokenQuery();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: "",
  };

  const timeToFormReturn = 3000;

  useEffect(() => {
    if (isSuccess) {
      singUpRef.current.style.display = "none";
      successBlockRef.current.style.display = "flex";

      setTimeout(() => {
        singUpRef.current.style.display = "block";
        successBlockRef.current.style.display = "none";
      }, timeToFormReturn);
    }
    // eslint-disable-next-line
  }, [isSuccess]);


  return (
    <>
      <section className="create-user" ref={singUpRef}>
        <div className="center">
          <h2 className="title">Working with POST request</h2>
        </div>
        <Formik
          className="create-user__form" 
          initialValues={initialValues}
          validationSchema={singUpSchema}
          onSubmit ={(values, {resetForm}) => {
            const formData = new FormData();
            formData.append('photo', values.photo);
            formData.append('position_id', +values.position_id);
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);

            createUser({ formData, token: tokenData.token });
            resetForm(initialValues);
          }}
        >
          {({ errors, touched, setFieldValue, isValid }) => (
            <>
            {isLoading ? <Spinner /> : null}
              <Form className="create-user__form">
                <InputForm name="name" errors={errors} touched={touched} />
                <InputForm name="email" errors={errors} touched={touched} />
                <InputForm name="phone" errors={errors} touched={touched} />
                <RadioInputs errors={errors} touched={touched} />
                <FileInput
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
                {isError ? <div style={{color: 'red', margin:'15px'}}>{error.data.message}</div> : null}

               <div className="center">
                   <button className={`submit-btn${isValid ? ' regular-btn' : ' disabled-btn'}`} type="submit">Sign up</button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </section>

      <div ref={successBlockRef} className="success-block">
        <h3 className="success-title title">User successfully registered</h3>
        <img src={successImg} alt="" />
      </div>
    </>
  );
};

export default CreateUserForm;

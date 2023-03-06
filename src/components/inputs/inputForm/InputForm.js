import { ErrorMessage, Field } from "formik";
import React from "react";
import styles from "./inputForm.module.scss";
import classNames from "classnames";

const InputForm = ({ name, errors, touched }) => {
  const input = classNames({
    [styles.input]: true,
    [styles.inputError]: errors[name] && touched[name],
  });

  const label = classNames({
    [styles.nameInputLabel]: true,
    [styles.lebelErrorMessage]: errors[name] && touched[name],
  });

  return (
    <div className={`${name} input-wrapper`}>
      <div className={label}>{name}</div>
      <Field
        name={name}
        placeholder={`Your ${name}`}
        className={`${input} create-user__text-input`}
      />

      {name === "phone" && !errors.phone && (
        <div className={styles.formatPhone}>+380 (XX) XXX - XX - XX</div>
      )}

      {errors[name] && touched[name] && (
        <ErrorMessage name={name}>
          {(msg) => <div className={styles.errorMessage}>{msg}</div>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default InputForm;

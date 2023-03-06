import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import styles from "./inputForm.module.scss";
import classNames from "classnames";

const InputForm = ({ name, errors, touched }) => {
  const [field, meta] = useField(name);

  const input = classNames({
    [styles.input]: true,
    [styles.inputError]: errors[name] && touched[name],
    [styles.inputFocused]: meta.touched && meta.focused,
  });

  const label = classNames({
    [styles.nameInputLabel]: true,
    [styles.lebelErrorMessage]: errors[name] && touched[name],
    [styles.labelFocused]: meta.touched && meta.focused,
  });

  return (
    <div className={`${name} input-wrapper`}>
      <div className={label}>{name}</div>
      <Field
        {...field}
        placeholder={`Your ${name}`}
        className={`${input} create-user__text-input`}
        onFocus={(e) => {
          field.onFocus(e);
          meta.onFocus(e);
        }}
        onBlur={(e) => {
          field.onBlur(e);
          meta.onBlur(e);
        }}
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

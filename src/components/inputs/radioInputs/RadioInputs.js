import React from "react";
import { ErrorMessage, Field } from "formik";
import classNames from "classnames";

import styles from "./radio-inputs.module.scss";
import { useGetPositionsQuery } from "../../../redux/apiSlice";

const RadioInputs = ({ errors, touched }) => {
  const { data: positionsObj = [], isSuccess } = useGetPositionsQuery();

  const redErrorMessage = classNames({
    [styles.errorMessage]: errors.position_id && touched.position_id,
  });

  const renderPositions = (positions) => {
    if (isSuccess) {
      return positionsObj.positions.map((e) => {
        return (
          <label key={e.id + 10}>
            <Field name="position_id" type="radio" value={e.id + ""} />
            <span className={styles.radioInput}>{e.name}</span>
          </label>
        );
      });
    }
  };

  const positionInputs = renderPositions(positionsObj.positions)

  return (
   <>
   <div className="select-position__title">Select your position</div>
    <div className="radio-buttons__wrapper">
      {positionInputs}
      {errors.position_id && touched.position_id && (
        <ErrorMessage name="position_id">
          {(msg) => <div className={redErrorMessage}>{msg}</div>}
        </ErrorMessage>
      )}
    </div>
   </>
  );
};

export default RadioInputs;

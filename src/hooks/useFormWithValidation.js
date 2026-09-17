import { useState } from "react";

function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage } = event.target;
    const form = event.target.closest("form");

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationMessage,
    }));

    if (form) {
      setIsValid(form.checkValidity());
    }
  }

  function resetForm(
    nextValues = initialValues,
    nextErrors = {},
    nextIsValid = false,
  ) {
    setValues(nextValues);
    setErrors(nextErrors);
    setIsValid(nextIsValid);
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}

export default useFormWithValidation;

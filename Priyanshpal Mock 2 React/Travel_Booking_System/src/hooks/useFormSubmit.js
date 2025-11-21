import { useState } from 'react';

function useFormSubmit() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values, submitFunction) => {
    setSubmitting(true);
    try {
      await submitFunction(values);
      setSubmitting(false);
      return true;
    } catch (error) {
      setSubmitting(false);
      return false;
    }
  };

  return { submitting, handleSubmit };
}

export default useFormSubmit;
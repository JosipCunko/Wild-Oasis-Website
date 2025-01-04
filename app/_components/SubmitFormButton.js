"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function SubmitFormButton({ updatingLabel, children }) {
  const { pending, formData, method, action } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 flex items-center gap-3 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? (
        <>
          <SpinnerMini /> <span>{updatingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default SubmitFormButton;

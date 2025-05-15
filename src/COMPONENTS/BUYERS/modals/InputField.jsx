import React, { useState } from "react";
import { Icon } from "@iconify/react";

const InputField = ({
  inputFor,
  inputId,
  fieldName,
  type,
  className,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue || "");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='w-full max-w-[483px]'>
      <div className='flex justify-between items-center text-[18px] font-medium mb-2'>
        <label htmlFor={inputFor}>{fieldName}</label>
        <button
          onClick={toggleEdit}
          type='button'
          className='flex items-center gap-2 text-black hover:text-gray-700 transition'
        >
          <Icon icon='material-symbols:edit-outline' width='20' height='20' />
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>
      <input
        type={type}
        id={inputId}
        value={value}
        disabled={!isEditing}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full p-3 rounded-md border transition duration-200 ${
          isEditing
            ? "border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            : "border-gray-300 bg-gray-100 cursor-not-allowed"
        }  ${className}`}
      />
    </div>
  );
};

export default InputField;

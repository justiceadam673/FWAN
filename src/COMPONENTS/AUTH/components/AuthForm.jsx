import React from "react";

const AuthForm = ({ uniqueName, type, placeholder }) => {
  return (
    <main className='font-[poppins] w-full '>
      <input
        type={type}
        id={uniqueName}
        name={uniqueName}
        placeholder={placeholder}
        className='h-[70px] p-[10px] max-w-[485px] w-full rounded-[15px] border border-[#CFCFCF]  '
        required
      />
    </main>
  );
};

export default AuthForm;

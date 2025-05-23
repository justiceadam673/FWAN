import React from "react";

const AuthForm = ({ uniqueName, type, placeholder }) => {
  return (
    <main className='font-[poppins] lg:w-full '>
      <input
        type={type}
        id={uniqueName}
        name={uniqueName}
        placeholder={placeholder}
        className='lg:h-[70px] h-[49.505px] p-[7.072px] lg:p-[10px] lg:max-w-[485px] w-full  rounded-[15px] border border-[#CFCFCF]  '
        required
      />
    </main>
  );
};

export default AuthForm;

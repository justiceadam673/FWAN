import React from "react";

const AuthButton = ({ buttonText }) => {
  return (
    <div>
      <button
        type='submit'
        className=' w-[485px] gap-[12.096px] rounded-[8px] bg-[#3D8236] flex justify-center items-center py-[19.353px] text-[#FAFAFA] text-[19.353px] leading-[29.03px] font-medium  '
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AuthButton;

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const FarmersProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "Muhamed",
    lastName: "Muhamed",
    email: "Muhamedali@gmail.com",
    phone: "0801233456789",
    address: "Opposite shop city, Old airport",
  });

  const [editState, setEditState] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleToggleEdit = (field) => {
    const isNowDone = editState[field];
    setEditState({ ...editState, [field]: !isNowDone });

    if (isNowDone) {
      setHasChanges(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    console.log("Submitting to backend:", formData);
    // Simulate backend call with a timeout
    setTimeout(() => {
      alert("Changes saved to backend!");
      setHasChanges(false);
    }, 1000);
  };

  const renderField = (label, name, type = "text", width = "w-[261px]") => (
    <div>
      <div className='flex justify-between items-center mb-1'>
        <label
          htmlFor={name}
          className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px]'
        >
          {label}
        </label>
        <button
          onClick={() => handleToggleEdit(name)}
          className='text-[#1E1E1E] flex items-center gap-[10px] text-[18px] leading-[29.03px] font-normal font-[Poppins]'
        >
          <Icon icon='material-symbols:edit-outline' className='text-[#000]' />
          {editState[name] ? "Done" : "Edit"}
        </button>
      </div>
      <input
        name={name}
        type={type}
        id={name}
        value={formData[name]}
        onChange={handleInputChange}
        disabled={!editState[name]}
        className={`flex ${width} h-[70px] p-[10px] items-center gap-[10px] self-stretch rounded-[15px] border border-[#CFCFCF] bg-[#FFF] text-[#000] font-[Poppins] text-[20px] not-italic font-normal leading-[29.03px]`}
      />
    </div>
  );

  return (
    <div className='flex flex-col w-[689px] place-self-center-safe items-center py-[20px]'>
      <div className='flex w-full h-[685px] items-center justify-center pt-[44px] pr-[51px] pb-[78px] pl-[51px] mt-[41px] bg-[#EBE9E9] rounded-[12px]'>
        <div className='w-full'>
          <h2 className='text-[#1E1E1E] font-[Kodchasan] text-[24px] not-italic leading-normal font-semibold mb-[26px]'>
            Personal Information
          </h2>

          <div className='grid grid-cols-2 gap-x-4 gap-y-[30px] mb-4'>
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
          </div>

          <div className='mb-[30px]'>
            {renderField("Email Address", "email", "email", "w-[568px]")}
          </div>
          <div className='mb-[30px]'>
            {renderField("Phone Number", "phone", "text", "max-w-[471px]")}
          </div>
          <div>
            {renderField("Residential Address", "address", "text", "w-full")}
          </div>
        </div>
      </div>

      <section className='w-full flex gap-[20px] justify-end'>
        <div className='mt-6 w-[194px] h-[50px]'>
          <button
            onClick={handleSaveClick}
            disabled={!hasChanges}
            className={`flex w-full h-full p-[10px] gap-[10px] rounded-[12px] border border-[#CFCFCF] font-[Poppins] text-[20px] leading-[29.03px] items-center justify-center ${
              hasChanges
                ? "bg-[#168B2B] text-white"
                : "bg-[#F3FAF6] text-[#CFCFCF] cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
};

export default FarmersProfile;

import React from "react";
import contactimg from "../../../assets/img/contactimg.png";

const ContactUs = () => {
  return (
    <div className='lg:flex items-center justify-center lg:py-[50px] p-[20px] pb-[50px] gap-[58px] bg-[#FFF] '>
      <h1 className='text-[20px] font-[Kodchasan] lg:hidden place-self-center font-semibold leading-normal '>
        Contact Us
      </h1>
      <section className='p-[20px]'>
        <img
          src={contactimg}
          alt='Logo'
          className=' rounded-[30px]   max-lg:h-[356px] max-md:h-full lg:w-[614px]  lg:h-[682px] '
        />
      </section>

      <div className='lg:w-[589px]  h-full  text-[12px] lg:h-[675px]'>
        <div className='flex flex-col gap-[40px] leading-[1.5] '>
          <p className='  font-poppins lg:text-[20px] '>
            We’d love to hear from you! Whether you have a question, feedback,
            or need support — the Fwan team is here to help.
          </p>

          <div>
            <h2 className='text-[#000] font-poppins font-medium leading-none  lg:text-[28px]'>
              {" "}
              📍 Office Address
            </h2>
            <p className='lg:text-[20px]'>
              Fwan HQ, Plot 10, Greenfields Avenue, AgroTech District, Lagos,
              Nigeria.
            </p>
          </div>

          <div>
            <h2 className='text-[#000] font-poppins font-medium  lg:text-[28px]'>
              {" "}
              📞 Phone Support
            </h2>
            <p className='lg:text-[20px]'>
              +234 800 123 4567 (Monday–Friday, 9:00 AM – 5:00)
            </p>
          </div>

          <div className=' '>
            <h2 className='text-[#000] font-poppins  font-medium  lg:text-[28px]'>
              📧 Email Us
            </h2>
            <p className='lg:text-[20px]'>
              {" "}
              General Inquiries: hello@fwan.ng Customer Support: support@fwan.ng
            </p>
          </div>

          <div>
            <h2 className='text-[#000] font-poppins  font-medium  lg:text-[28px]'>
              {" "}
              🤝 Follow Us{" "}
            </h2>
            <p className='lg:text-[20px]'>| Instagram | Twitter: @fwan.ng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from 'react'
import contactimg from '../../../assets/img/contactimg.png'

const ContactUs = () => {
  return (
    
      <div className='flex items-center  bg-[#FFF] '>
        <section>
      <img
       src={contactimg}
       alt='Logo'
        className=' rounded-[30px] width-[614pxpx] h-[682px] mt-[102px]  mb-[159px] ml-[96px]'
        />
              
    
       </section >


       <div className='w-[589px]  h-[675px] ml-[58px] pr-[83px]'>
        <div className='flex flex-col gap-[40px] leading-[1.5] '>
           <p className='  font-poppins text-[20px] '>We’d love to hear from you! Whether you have a question, feedback, or need support — the Fwan team is here to help.

           </p>
              
           <div>
             < h2 className='text-[#000] font-poppins text-2xl  font-medium leading-none  text-[28px]'> 📍 
            Office Address  
            </h2>
            <p className='text-[20px]'>
              Fwan HQ, Plot 10, Greenfields Avenue, AgroTech District, Lagos, Nigeria.
            </p>
           </div>
             

             <div>
            <h2 className='text-[#000] font-poppins font-medium  text-[28px]'> 📞 Phone Support</h2>
            <p className='text-[20px]'>+234 800 123 4567 (Monday–Friday, 9:00 AM – 5:00)</p>
              </div>
                  
                 <div className=' '>
            <h2 className='text-[#000] font-poppins  font-medium  text-[28px]'>📧 Email Us</h2>
            <p className='text-[20px]'> General Inquiries: hello@fwan.ng  Customer Support: support@fwan.ng</p>
               </div>


            <div>

            <h2 className='text-[#000] font-poppins  font-medium  text-[28px]'> 🤝 Follow Us </h2>
            <p className='text-[20px]'>| Instagram | Twitter: @fwan.ng</p>
            </div>
          </div>
      
      
       </div>


    </div>
    
  )
}

export default ContactUs

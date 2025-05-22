import React from 'react';
import About from '../../../assets/img/about.png';

const AboutUs = () => {
  return (
    <div className=' flex flex-col w-full h-full items-center justify-center font-[Poppins]  px-[80px]  bg-[#FFFF] '>
      <h1 className=' text-[#1E1E1E] text-[36px]  font-[Poppins]   '>About Fwan</h1>
      
      <img
        src={About}
        alt='Logo'
        className='w-full h-full rounded-[30px] mt-[24px]'
      />
      
    


      <div className='pl-[224px] pr-[192px]  pb-[80px]  mt-[50.59px] '>
       
      <p className=' mb-[10px]'>
        Welcome to Fwan — where technology meets agriculture to create a smarter, fairer, and more efficient way to trade farm produce.

        <br />
        <br>
        </br>
       We started Fwan with a simple but powerful vision: to empower farmers and streamline the fresh produce supply chain. For too long, small-scale farmers have faced challenges in getting fair prices, reaching the right buyers, and dealing with middlemen who reduce their earnings. At the same time, buyers — from individuals to small businesses — struggle to access fresh, affordable, and traceable produce directly from the source..

       <br />
        <br>
        </br>
      We’ve built a digital platform where farmers can list their produce, set a flexible price range, and receive bids from interested buyers in real-time. Buyers, on the other hand, can explore a wide range of farm-fresh goods, place competitive bids, and negotiate directly with sellers — all from the convenience of their device.
      </p>
      
         <br />
        <br>
        </br>
       
        <h2 className='text-[#000] font-poppins text-2xl not-italic font-semibold leading-none  text-[24px]'>Our Mission</h2>
        <p>
         Our mission is to build a trusted, inclusive, and transparent agricultural marketplace that benefits both farmers and buyers. We aim to:
         </p>
         
        <br />
        <br>
        </br>

        <h3 className='text-[#000] font-poppins text-[20px] not-italic font-semibold leading-none  '>Empower Farmers</h3>
         <p>
          Give producers more control over pricing, visibility, and sales through digital tools.
         </p>
           <br /><br></br>

           <h3>Enhance Access for Buyers</h3>
           <p>
            Make it easier for individuals, vendors, and retailers to find and buy quality produce at fair prices
           </p>

            <br /><br></br>
            <h3>Promote Fair Trade and Reduce Waste</h3>
            <p>
              Ensure more of the profit goes to the farmer while reducing post-harvest losses through faster sales and better market access.
            </p>

              <br /><br></br>
                    

            <h3>Build Stronger Communities  </h3>
            <p>
              Strengthen local food systems by fostering direct relationships between those who grow food and those who consume it.
            </p>

               <br /><br></br>
                                  


             <h2 className='text-[#000] font-poppins text-[24px] not-italic font-[500px] leading-[normal]'>Why Choose Fwan?</h2>
             <p>

              Transparent bidding system with no hidden charges
                <br /><br></br>
       
              Real-time communication between farmers and buyers
                 <br /><br></br>
              Easy-to-use dashboards for listing, bidding, and tracking produce
                  <br /><br></br>
              Mobile-friendly design for rural accessibility
                  <br /><br></br>
              Secure and scalable infrastructure
                   <br /><br></br>
              At Fwan, we’re not just building a platform — we’re building a movement. A movement toward more inclusive agricultural commerce, stronger farmer livelihoods, and better food for all.
                    <br /><br></br>
              Join us in shaping the future of fresh produce trade.
              Fwan — Freshness, Fairness, and a New Way Forward.
             </p>
      </div>


    </div>


   


    
  );
};

export default AboutUs;


import React from "react";
import { Icon } from "@iconify/react";
import FarmersListingCard from "../components/FarmersListingCard";
import Image from "../../../assets/img/tomatoes.png";
const FarmersListings = () => {
  return (
    <div>
      <section className='flex my-[28px]  gap-[33px] ml-[58px] '>
        <button className='bg-[#69B645] rounded-[8px] text-white flex justify-center items-center gap-[19px] py-[8px] pr-[29px] '>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center '>
            <Icon
              icon='line-md:plus'
              className='text-[#E8E4E4]  w-[24px] h-[24px]   '
            />
          </span>{" "}
          New Listing
        </button>
      </section>

      <section></section>
      <section>
        <div>
          <h1 className='text-[#1E1E1E] font-[Kodchasan] text-[20px ] leading-normal font-medium ml-[58px] w-[982] h-[26px]'>
            Listings
          </h1>
        </div>

        <div
          className='bg-[#F1E7E7] w-[982px] h-[65px] ml-[58px] rounde-t-[12px]  px-[18px] pr-[755px] pt-[21px] pb-[20px] rounded-t-[12px] rounded-b-none  ">

'
        >
          <p className=' '>All in stock sold out</p>
        </div>
      </section>

      <section>
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
        <FarmersListingCard
          image={Image}
          quantityHeader={"quantity"}
          quantity={"5kg"}
          priceHeader={"price"}
          price={"#50,000"}
          prodHeader={"product"}
          prod={"Tomatoe"}
          offersHeader={"offers"}
          offers={"13"}
          statusHeader={"status"}
          status={"in stock"}
        />
      </section>

    </div>
  );
};

export default FarmersListings;

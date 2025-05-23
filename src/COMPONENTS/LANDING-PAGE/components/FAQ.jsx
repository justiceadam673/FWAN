import React, { useState } from "react";
import { Icon } from "@iconify/react";

const faqs = [
  {
    question: "How long is the delivery?",
    answer:
      "The delivery normally is 2 days and usually takes a maximum of 4 days. If the delay is longer than that, we would refund you the money paid.",
  },
  {
    question: "Are the farm produce organic?",
    answer: "Yes, all farm produce are certified organic and grown naturally.",
  },
  {
    question: "Is Pickup available for buyers?",
    answer: "Yes, pickup is available depending on the buyer's location.",
  },
  {
    question: "Are dehydrated foods Available?",
    answer: "Yes, we offer a range of dehydrated farm products.",
  },
  {
    question: "Can farmer review his/her Farm produce?",
    answer:
      "Yes, farmers can review and update their product listings anytime.",
  },
  {
    question: "Do you have a physical location?",
    answer: "Yes, we have a central office. Contact us for directions.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className='bg-white'>
      <section className='max-w-[770px] mx-auto  mt-12 p-4'>
        <h2 className='text-center text-[20px] lg:text-[45px]  kodchasan-semibold leading-normal text-[#1E1E1E] mb-8'>
          Frequently Asked Questions
        </h2>
        <div className='flex flex-col divide-y divide-gray-300'>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                className='flex justify-between items-center py-4 cursor-pointer'
                onClick={() => toggleIndex(index)}
              >
                <h3 className=' text-[14px] md:text-[18px] lg:text-[24px] leading-normal poppins-medium'>
                  {faq.question}
                </h3>
                <Icon
                  icon={
                    openIndex === index ? "iconamoon:close-light" : "carbon:add"
                  }
                  width={24}
                  height={24}
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className=' text-[12px] md:text-[18px] lg:text-[20px] leading-normal poppins-regular text-[#1E1E1E] pb-4 transition-all ease-in-out duration-[1s]'>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FAQ;

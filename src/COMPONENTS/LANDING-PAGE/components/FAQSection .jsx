import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How Long Is The Wait For Delivery?",
      answer: "It takes three to four working days.",
    },
    {
      question: "Are The Farm Produce Organic?",
      answer:
        "Yes, all our farm produce are 100% organic and grown without synthetic pesticides or fertilizers.",
    },
    {
      question: "Is Pickup Available?",
      answer:
        "Yes, we offer pickup options at our designated locations. You can select pickup during checkout.",
    },
    {
      question: "Are Dehydrated Foods Available?",
      answer:
        "Currently we offer a selection of dehydrated fruits and vegetables. Check our 'Preserved Foods' section for available options.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-lg">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`faq-content-${index}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

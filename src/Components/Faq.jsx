import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const faqs = [
    {
        question: "How do I book a parcel for delivery?",
        answer:
            "Users can book a parcel by signing in, entering delivery details, and making a payment.",
    },
    {
        question: "How can I track my parcel?",
        answer:
            "You can track your parcel by entering your tracking ID in the tracking section on our website.",
    },
    {
        question: "What are the delivery charges?",
        answer:
            "Delivery charges vary based on weight, distance, and delivery speed. Check our pricing page for details.",
    },
    {
        question: "What should I do if my parcel is delayed?",
        answer:
            "If your parcel is delayed, please contact our support team with your tracking ID for assistance.",
    },
    {
        question: "Can I cancel a parcel after booking?",
        answer:
            "Yes, but cancellation policies apply based on the parcel's delivery status. Check our terms for more information.",
    },
];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24   ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ illustration"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16 text-center lg:text-left">
                <h6 className="text-lg font-medium text-blue-600 mb-2">
                  FAQs
                </h6>
                <h2 className="text-4xl font-bold  leading-[3.25rem] dark:text-white">
                  Looking for answers?
                </h2>
              </div>
              <div className="accordion-group">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`accordion py-8 border-b border-gray-200 ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`accordion-toggle group flex justify-between items-center w-full text-xl font-normal text-gray-600 hover:text-blue-600 ${
                        activeIndex === index
                          ? "text-blue-600 font-medium"
                          : ""
                      }`}
                      aria-controls={`faq-content-${index}`}
                    >
                      <h5>{faq.question}</h5>
                      {activeIndex === index ? (
                        <AiOutlineUp
                          className="transition-transform text-gray-900"
                          size={22}
                        />
                      ) : (
                        <AiOutlineDown
                          className="transition-transform text-gray-900"
                          size={22}
                        />
                      )}
                    </button>
                    <div
                      id={`faq-content-${index}`}
                      className={`accordion-content overflow-hidden transition-max-height duration-300 ${
                        activeIndex === index ? "max-h-[200px]" : "max-h-0"
                      }`}
                    >
                      <p className="text-base font-normal text-gray-600 mt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
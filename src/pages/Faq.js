import React, { useState } from "react";
import "../styles/faq.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is an FAQ section?",
          answer: "An FAQ section can be used to quickly answer common questions about your business like 'Where do you ship to?', 'What are your opening hours?', or 'How can I book a service?'.",
        },
        {
          question: "Why do FAQs matter?",
          answer: "FAQs help provide quick answers to common questions, improving customer experience and reducing support inquiries.",
        },
        {
          question: "Where can I add my FAQs?",
          answer: "You can add FAQs in the settings section of your admin panel.",
        },
      ],
    },
    {
      category: "Setting up FAQs",
      questions: [
        {
          question: "How do I create a new FAQ?",
          answer: "Go to the admin panel, navigate to the FAQ section, and click 'Add New'.",
        },
        {
          question: "Can I categorize my FAQs?",
          answer: "Yes! You can create multiple categories to organize your FAQs effectively.",
        },
      ],
    },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-tabs">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h3 className="faq-category-title">{category.category}</h3>
            {category.questions.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(`${catIndex}-${index}`)}
                >
                  {faq.question}
                  <span className="faq-icon">{openIndex === `${catIndex}-${index}` ? "▲" : "▼"}</span>
                </button>
                {openIndex === `${catIndex}-${index}` && (
                  <p className="faq-answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

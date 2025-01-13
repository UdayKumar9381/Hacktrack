import React, { useState } from 'react';
import './FaqSection.css';

function FaqSection() {
  // State to manage which FAQ is open
  const [openFaq, setOpenFaq] = useState(null);

  // Function to toggle the visibility of the answer
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Data for FAQ questions and answers
  const faqs = [
    {
      question: 'What is HackTrack?',
      answer: 'HackTrack is a global hackathon platform that allows developers to participate in coding challenges, collaborate with others, and solve real-world problems.',
    },
    {
      question: 'How can I register for hackathons?',
      answer: 'You can register for hackathons by signing up on our platform, browsing through active events, and clicking the "Register" button for the event you want to join.',
    },
    {
      question: 'What are the benefits of participating?',
      answer: 'Participating in hackathons enhances your skills, builds your portfolio, and gives you the opportunity to win prizes, network with peers, and get hired by tech companies.',
    },
    {
      question: 'Is there a fee to participate in hackathons?',
      answer: 'Most of the hackathons on HackTrack are free to join. However, some events may have a registration fee. Details are provided on the event page.',
    },
    {
      question: 'How do I form a team for a hackathon?',
      answer: 'You can form a team by inviting friends or joining other participants looking for team members on the event page. Collaboration is encouraged to solve complex challenges.',
    },
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              {faq.question}
              <span className="faq-icon">{openFaq === index ? '-' : '+'}</span>
            </div>
            {openFaq === index && <div className="faq-answer">{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FaqSection;

"use client"
import React, { useState } from 'react';
import { useDarkMode } from "@/context/DarkModeContext";

const FeedbackPage: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', feedback: '' });
  };

  const styles = {
    container: `max-w-2xl mx-auto p-8 rounded-lg shadow-md ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`,
    heading: `text-3xl font-bold mb-6 ${
      darkMode ? "text-gray-100" : "text-gray-900"
    }`,
    label: `block mb-2 ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`,
    input: `w-full p-2 mb-4 rounded ${
      darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
    }`,
    textarea: `w-full p-2 mb-4 rounded resize-y ${
      darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
    }`,
    button: `w-full py-2 px-4 rounded font-bold ${
      darkMode 
        ? "bg-blue-600 text-white hover:bg-blue-700" 
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`,
    successMessage: `mt-4 p-2 rounded ${
      darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"
    }`,
    infoBox: `mb-6 p-4 rounded-lg ${
        darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"
      }`,
  };

  return (
    <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Anonymous Feedback</h1>
        
        <div className={styles.infoBox}>
          <h2 className="text-xl font-semibold mb-2">Why Your Feedback Matters</h2>
          <p className="mb-2">Your honest feedback is invaluable to my personal and professional growth. Here's why it's important:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>It helps me identify blind spots in my skills or behavior</li>
            <li>It provides perspectives I might not have considered</li>
            <li>It encourages continuous improvement in my work and interactions</li>
            <li>It allows me to better serve and collaborate with others</li>
          </ul>
          <p><strong>Your feedback is completely anonymous unless you choose to provide your name or email.</strong></p>
        </div>

        
        {isSubmitted && (
          <div className={styles.successMessage}>
            Thank you for your valuable feedback! It has been submitted successfully and will be used for personal growth and improvement.
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className={styles.label}>Name (Optional)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Leave blank for anonymity"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className={styles.label}>Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Leave blank for anonymity"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="feedback" className={styles.label}>Your Feedback *</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              rows={5}
              className={styles.textarea}
              placeholder="Please share your honest thoughts, suggestions, or observations..."
            ></textarea>
          </div>
          
          <button type="submit" className={styles.button}>
            Submit Anonymous Feedback
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          By submitting this form, you acknowledge that the feedback provided may be used for personal and professional development purposes.
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;
"use client"
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDarkMode } from "@/context/DarkModeContext";

const FeedbackPage: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    const { name, email, feedback } = formData;

    if (email && !isValidEmail(email)) {
      setFormError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (!feedback) {
      setFormError("Please enter your feedback.");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("feedback", feedback);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxw4DmM7xiV8DwOW54zAV1Mj1OFu4hbg5mQb3Jdehfks_h4wzskuBbOn0sJeSHEM7G3/exec",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', feedback: '' });
      } else {
        setFormError("Form submission error. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const styles = {
    container: `max-w-2xl mx-auto p-8 rounded-lg shadow-md ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`,
    heading: `text-3xl font-bold mb-6 ${
      darkMode ? "text-gray-100" : "text-gray-900"
    }`,
    label: `block mb-2 text-sm font-medium ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`,
    input: `w-full p-3 mb-4 rounded-md border ${
      darkMode 
        ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500" 
        : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    textarea: `w-full p-3 mb-4 rounded-md border ${
      darkMode 
        ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500" 
        : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none`,
    button: `w-full py-3 px-4 rounded-md font-medium transition duration-150 ease-in-out ${
      darkMode 
        ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
        : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    }`,
    successMessage: `mt-4 p-3 rounded-md ${
      darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"
    }`,
    infoBox: `mb-6 p-4 rounded-md border ${
      darkMode ? "border-gray-700" : "border-gray-300"
    }`,
    optionalText: `text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`,
  };

  return (
    <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Anonymous Feedback</h1>
        
        <div className={styles.infoBox}>
          <h2 className="text-xl font-semibold mb-3">Why Your Feedback Matters</h2>
          <p className="mb-3">Your honest feedback is invaluable for personal and professional growth. It helps:</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>Identify blind spots in skills or behavior</li>
            <li>Provide new perspectives</li>
            <li>Encourage continuous improvement</li>
            <li>Enhance collaboration and service</li>
          </ul>
          <p className="font-medium">Your feedback remains anonymous unless you choose to provide your name or email.</p>
        </div>

        {isSubmitted ? (
          <div className={styles.successMessage}>
            Thank you for your valuable feedback! It has been submitted successfully and will be used for personal growth and improvement.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.optionalText}>(Optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your name (optional)"
                ref={firstInputRef}
              />
            </div>
            
            <div>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.optionalText}>(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your email (optional)"
              />
            </div>
            
            <div>
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
            
            {formError && (
              <div className={`text-red-500 ${darkMode ? 'bg-red-900' : 'bg-red-100'} p-2 rounded`}>
                {formError}
              </div>
            )}
            
            <button 
              type="submit" 
              className={`${styles.button} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Anonymous Feedback'}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-center">
          By submitting this form, you acknowledge that the feedback provided may be used for personal and professional development purposes.
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;
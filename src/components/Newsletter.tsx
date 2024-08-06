
"use client";

import React, { useState, useRef } from 'react';
import { useDarkMode } from "@/context/DarkModeContext";

const Newsletter: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NEWSLETTER_API_ENDPOINT as string, {
        method: "POST",
        body: new URLSearchParams({ name, email }),
      });
      
      const result = await response.json();
      if (result.result === "success") {
        setStatus('success');
        setEmail('');
        setName('');
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const styles = {
    container: `mt-12 ${darkMode ? "text-gray-100" : "text-gray-900"}`,
    heading: `text-2xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`,
    subheading: `mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`,
    input: `w-full p-3 rounded-md border ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400" : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    button: `w-full py-3 px-4 rounded-md font-medium text-white transition duration-150 ease-in-out ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    successMessage: `mt-4 p-4 rounded-md text-center ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`,
    errorMessage: `mt-2 text-sm text-red-500`,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Stay Updated</h2>
      <p className={styles.subheading}>Get the latest news and insights delivered to your inbox.</p>

      {status === 'success' ? (
        <div className={styles.successMessage}>
          <p className="font-bold mb-2">Thank you for subscribing!</p>
          <p>You'll receive our next newsletter soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Your email address"
              required
              ref={emailInputRef}
            />
          </div>
          
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your name (optional)"
            />
          </div>
          
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          
          <button 
            type="submit" 
            className={`${styles.button} ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>
      )}
      
      <p className={`mt-4 text-xs text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter;
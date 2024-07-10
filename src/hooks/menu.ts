import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Load dark mode preference from localStorage if available
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setDarkMode(JSON.parse(storedDarkMode));
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        // Store dark mode preference in localStorage
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    return { darkMode, toggleDarkMode };
};

export default useDarkMode;

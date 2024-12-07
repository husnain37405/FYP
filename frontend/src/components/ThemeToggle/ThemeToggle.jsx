// // src/components/ThemeToggle/ThemeToggle.jsx
// import React, { useEffect, useState } from 'react';

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <button onClick={toggleTheme}>
//       {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
//     </button>
//   );
// };

// export default ThemeToggle;

// src/components/ThemeToggle/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
    </button>
  );
};

export default ThemeToggle;

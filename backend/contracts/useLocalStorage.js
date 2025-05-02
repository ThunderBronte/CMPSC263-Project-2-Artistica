// import { useState } from 'react';

// function useLocalStorage(key, initialValue) {
//   // Check if localStorage has the key 
//   const storedValue = localStorage.getItem(key);
  
//   // If there's a stored value, use it
//   const [stored, setStored] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

//   // Update localStorage whenever the state changes
//   const setValue = (value) => {
//     setStored(value);
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(value));
//     }, [items]);
//   };

//   return [stored, setValue];
// }

// export default useLocalStorage;

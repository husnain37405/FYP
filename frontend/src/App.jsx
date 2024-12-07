import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from './redux/features/auth/authSlice';
import Dashboard from './pages/Dashboard';
import './pages/Dashboard.css';
import './components/Dashboard/DashboardCards.css';
import './App.css';
import './styles/variables.css';



function App() {
  const [theme, setTheme] = useState('light');
 const {token} =useSelector((state)=>state.auth)
const dispatch = useDispatch();
 useEffect(()=>{
 if(token){
  const {exp} = jwtDecode(token)
 const checkTokenValidity = ()=>{
  if(exp<Date.now()/1000){
    alert("Your session has Expired, Please login again to continue using APP")
    dispatch(authLogout())

  
    dispatch(userApi.util.invalidateTags([])); 
    dispatch(authApi.util.invalidateTags([]));
    
    setTimeout(() => {
      dispatch(userApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
    }, 100);



   }
 }
 const interval = setInterval(checkTokenValidity, 3000)
 return () => clearInterval(interval);
 }
}, [token, dispatch])


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
    <div className={`App ${theme}`}>
      <Dashboard toggleTheme={toggleTheme} theme={theme} />
    </div>
    </>
  );
}

export default App;

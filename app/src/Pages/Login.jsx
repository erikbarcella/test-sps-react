import React, { useState, useEffect}	 from 'react';
import FormLogin from '../components/loginPage/FormLogin';
import DesignHome from '../components/global/DesignHome' // utilizando export default no componente
import { useAuth } from '../Context/AuthContext';
/* import '../styles/Login.css'; */

export function Login() {
 
  const [isWrapped, setIsWrapped] = useState(false);
  const { user, isAuthenticated } = useAuth()


  useEffect(() => {
    function handleResize() {
      setIsWrapped(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
      <div>
        <div className="container">
        
        {!user && isAuthenticated &&( 
           <div className={`left-column ${isWrapped ? 'wrapped' : ''}`}>
         
            <DesignHome/>
          </div>
          )}
        {/* <div className={`left-column ${isWrapped ? 'wrapped' : ''}`}>
            <DesignHome/>
        </div> */}
          <div className="right-column">
            
            <FormLogin />
        
          </div>
        </div>
      
    </div>
  );
};





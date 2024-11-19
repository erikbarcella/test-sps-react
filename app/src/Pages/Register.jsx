import React, { useState, useEffect } from 'react';
import FormRegister from '../components/registerPage/FormRegister';
import DesignHome from '../components/global/DesignHome'
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace
 } from "react-icons/md";


export function Register () {

    const [isWrapped, setIsWrapped] = useState(false);

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
  
    <div className={`left-column ${isWrapped ? 'wrapped' : ''}`}>
        <DesignHome/>
       
      </div>
      <div className="right-column">
        
      <Link to="/config">
        <p className='links linksRegister'> <MdKeyboardBackspace/> Voltar</p>
      </Link>  

        <FormRegister />
        
      </div>
    </div>
  
</div>
  );
}
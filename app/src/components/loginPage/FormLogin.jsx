import {useState}from 'react';
import Button from '../global/Button';
import { useAuth } from '../../Context/AuthContext';
import api from '../../services/api';
import { Home } from '../../Pages/Private/Home/Home';
import { Link } from 'react-router-dom';

export function FormLogin(){

const {user,login,isAuthenticated} = useAuth();
const [email,setemail]= useState(''); 
const [password,setPassword] = useState(''); 
const [error,setError] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/login',{email,password});
    login(response.data.user,response.data.token)
  } catch (error) {
    if (!error?.response) {
      setError('Erro ao acessar o servidor');
    } else if (error.response.status === 401 ) {
      setError('Usuário ou senha inválidos');
    } else if (error.response.status ===403) {
      setError('Usuário não autorizado pelo administrador');
    }
  }
};

    return (
      <div className='login-form-wrap'>
        
        {user == null  ?  (
        <>
          <form className='login-form'>
          
            <p className='label-text'>Email</p>
            <input className='text-input' type='text' name='email' placeholder='Insira seu email' required
            onChange={(e)=>setemail(e.target.value)}
            />
            <p className='label-text'>Senha</p>
            <input className='text-input' type='password' name='password' placeholder='Insira sua senha' required
            onChange={(e)=> setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}
             
            <Button type='submit' className='btn-login'  text="Login" color="#42405B" width={337}
            onClick={(e) => handleSubmit(e)} 
            />
 
          </form>
          </> 
          ): (
            <>
              <Home/>
            </>
          )}
        </div>
    );
  }

  export default FormLogin;
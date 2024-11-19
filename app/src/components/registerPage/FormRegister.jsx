import Button from '../global/Button';

import { useState } from 'react';
import HandleRegister from '../../services/handleRegister';

export function FormRegister () {

  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {

    e.preventDefault();
    // Verificar se as senhas coincidem
    if (password !== passwordCheck) {
      setError('As senhas não coincidem.');
      return;
    }
    // Limpar a mensagem de erro se as senhas coincidirem
    setError('');
    // Prosseguir com a requisição de registro
    HandleRegister(email, password, name,type, setError, setMessage);
  };

  const handlePasswordChange = (e) => {setPassword(e.target.value)};
  const handlePasswordCheckChange = (e) => {setPasswordCheck(e.target.value)};
  const checkPasswordMatch = () => {setPasswordMatch(password === passwordCheck)};

  return (
    <div className='register-form-wrap'>
      <br />
      <>
        <form className='register-form'>
          <p className='label-text'>Nome*</p>
          <input
            className='text-input'
            type='text'
            name='name'
            placeholder='Insira seu nome'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p className='label-text'>Email*</p>
          <input
            className='text-input'
            type='email'
            name='email'
            required
            placeholder='Insira seu email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='label-text'>Tipo</p>
          <input
            className='text-input'
            type='text'
            name='type'
            placeholder='Insira o tipo de usuário'
            required
            onChange={(e) => setType(e.target.value)}
          />
          <p className='label-text'>Senha*</p>
          <input
            className='text-input'
            type='password'
            name='password'
            placeholder='Insira a senha'
            required
            onChange={handlePasswordChange}
          />
          <p className='label-text'>Confirme a senha*</p>
          <input
            className='text-input'
            type='password'
            name='password-check'
            placeholder='Confirme a senha'
            required
            onChange={handlePasswordCheckChange}
            onBlur={checkPasswordMatch}
          />
          {!passwordMatch && <p className='error-message'>As senhas não coincidem.</p>}
          <p>{error}</p>
          <p>{message}</p>
          <Button
            type='submit'
            className='btn-register'
            text='Registrar'
            color='#42405B'
            width='337px'
            onClick={(e) => handleSubmit(e)}
          ></Button>
          <p className='alert-required '>* Campos de preenchimento obrigatório</p>
        </form>
      </>
    </div>
  );
}

export default FormRegister;



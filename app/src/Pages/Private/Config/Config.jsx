import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidemenu } from "../../../components/global/Sidemenu";
import styles from './Config.module.css';
import { useAuth } from "../../../Context/AuthContext";
import api from '../../../services/api';
import Button from "../../../components/global/Button";
import Modal from "react-modal"; // Importando o Modal
import {
  MdSearch,
} from "react-icons/md";

export function Config() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('/users');
        if (response.data) {
          setUsers(response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout();
           setAlert("Token expirado. Faça login novamente.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [logout]);


  const handleTermoBuscaChange = (e) => {
    setTermoBusca(e.target.value);
  };

  const usersFiltrados = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(termoBusca.toLowerCase()) ||
      user.email.toLowerCase().includes(termoBusca.toLowerCase())
    );
  });

  const handleExcluir = async (email) => {
    const userToDelete = users.find((user) => user.email=== email);
    const shouldClear = window.confirm(`Tem certeza de que deseja deletar o usuario ${userToDelete.name}? `);
    if (shouldClear === false) return;
    try {
      const response = await api.delete(`/users/${email}`);
      if (response.data.error) {
        setAlert("erro ao excluir usuario");
      }
      setAlert(`usuario excluido com sucesso`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    } catch (error) {
       setAlert("erro ao excluir usuario");
    }
  };

  const handleAlterar = async (email) => {
    const userToAlter = users.find((user) => user.email=== email);
    setSelectedUser(userToAlter);
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevData) => ({
			...prevData,
			[name]: value
		}));
  };

  const handleAlterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${selectedUser.email}`, selectedUser);
      if (response.data.error) {
        setAlert("erro ao alterar usuario");
      }
      setAlert(`usuario alterado com sucesso`);
      setUsers((prevUsers) => prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          return { ...user, ...selectedUser };
        }
        return user;
      }));
    } catch (error) {
      setAlert("erro ao alterar usuario");
    }
  };
 


  return (
    <div className={styles.main}>
      <div className={styles.container2}>
        <div className={styles.sidemenu}>
          <Sidemenu />
        </div>
        <div className={styles.content}>
          <h3>Bem-vindo á página de administração de usuários </h3>
          <input
            type="text"
            placeholder="Buscar Usuarios..."
            value={termoBusca}
            onChange={handleTermoBuscaChange}
            className={styles.inputBusca}
          />
          <span className={styles.iconSearch}>
            <MdSearch />
          </span>
          {loading ? (
            <p>Carregando usuários...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usersFiltrados.map((user, index) => (

                  <tr key={index} className={styles.tabLine}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.type}</td>
                    <td>
                      <Button
                        type="button"
                        className={styles.admin}
                        text="Excluir"
                        color="#A0616A"
                        padding={2}
                        width={100}
                        fontSize={14}
                        onClick={() => handleExcluir(user.email)}
                      />
                      <Button
                        type="button"
                        className={styles.admin}
                        text="Alterar"
                        color="rgb(155, 160, 97)"
                        padding={2}
                        width={100}
                        fontSize={14}
                        onClick={() => handleAlterar(user.email)}
                      />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
            
          )}
          {alert && <p>{alert}</p>}
          {isModalOpen && (
      <div >
        <form className=''>
          <p className=''>Nome*</p>
          <input
            className=''
            type='text'
            name='name'
            placeholder='Insira seu nome'
            onChange={handleChange}
            value={selectedUser.name}
            required
          />
          <p className=''>Email*</p>
          <input
            className=''
            type='email'
            name='email'
            required
            placeholder='Insira seu email'
            onChange={handleChange}
            value={selectedUser.email}
          />
          <p className=''>Tipo</p>
          <input
            className=''
            type='text'
            name='type'
            placeholder='Insira o tipo de usuário'
            required
            onChange={handleChange}
            value={selectedUser.type}
          />
          <p className=''>Senha*</p>
          <input
            className=''
            type='password'
            name='password'
            placeholder='Insira a senha'
            onChange={handleChange}
            value={selectedUser.password}
          />
          <p>{error}</p>
          <p>{message}</p>
          <Button
            type='submit'
            className='btn-register'
            text='alterar'
            color='#42405B'
            width='20vw'
            onClick={handleAlterUser}
          ></Button>
        </form>
      </div>
      )}
        </div>
        <Button
          type="button"
          text="Adicionar"
          color="rgb(120, 150, 113)"
          padding={4}
          width={100}
          fontSize={16}
          onClick={()=> navigate('/registro')}
          style={{ margin: '10px',   }} // o botao precisa ficar na parte debaixo da pagina 
        />
      </div>
    </div>
  );
}

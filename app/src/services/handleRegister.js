import api from "./api";

const HandleRegister = async (email, password, name, type,setError,setMessage) => {
  try {
    const response = await api.post('/users',
      JSON.stringify({ email,password,name,type }),
      {headers: { 'Content-Type': 'application/json' }}
    );
    console.log("respojnse ", response);
    if(response.status === 201){
      setMessage('Usuario cadastrado com sucesso');
    }

  } catch (error) {
    console.log("err", error);
    if (!error?.response) {
      setError('Erro ao acessar o servidor');
    } else if (error.response.status === 401) {
      setError('Usuario existente');
    } else if( error?.response?.data){
      setError(error.response.data);
    }
  }
};

export default HandleRegister;
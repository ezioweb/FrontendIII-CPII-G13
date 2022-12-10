import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { ctdUrl } from "../../urls";
import styles from "./Form.module.css";

const LoginForm = () => {

  const [authToken, setAuthToken] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [erroUserName, setErroUserName] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [erroPassword, setErroPassword] = useState(false)
  const [erroForm, setErroForm] = useState(true)
  const navigate = useNavigate()
  const { theme } = useTheme()

  // const { setToken } = useAuth()

  
  //UserEffect para validar formulário
  useEffect(
    () => {
      if(userName.length < 6 || userPassword === ""){

        setErroForm(true)
        setErroUserName(true)
        setErroPassword(true)

      } else {
        setErroForm(false)
        setErroUserName(false)
        setErroPassword(false)     
      }
    }, [userName, userPassword]
  )

  

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    //setNotFound

    event.preventDefault()

    const userData = {
      username: userName,
      password: userPassword
    }

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userData)
    }

    fetch(`${ctdUrl}auth`, requestConfig).then(
      response => {
        
        if(response.status === 200) {
          response.json().then(
            data => {
              localStorage.setItem('authToken', data.jwt)
              setAuthToken(data.jwt)
              // setToken(data.jwt)
            }
          )
          
          navigate('home')

        } else {
          setNotFound(true)
          
        }
      }
    )
      
  }

  // voltar ao normal apos o erro no servidor
  useEffect(
    () => {
      if(notFound){
   
      setNotFound(false)
    }
    }, [userName, userPassword]
  )



  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${theme === 'dark' ? styles.CardBody : '' }`}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={`form-control ${styles.inputSpacing} ${erroUserName ? 'erroForm' : ''} `}
                placeholder="Login"
                name="login"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />

              {
                erroUserName ? (
                <span className='erroForm'>
                  {/* O campo <strong>login</strong> deve conter no mínimo 5 caracteres  */}
                </span>
                ) : null
              }

              <input
                className={`form-control ${styles.inputSpacing} `}
                placeholder="Password"
                name="password"
                type="password"
                required
                value={userPassword}
                onChange={event => setUserPassword(event.target.value)}
              />
              
              {
                erroPassword ? (
                <span className='erroForm'>
                  {/* teste */}
                </span>
                ) : null
              }

              {
                notFound ? (
                <span className='erroForm'>
                  Verifique suas informações novamente, usuário ou senha incorreto.
                </span>
                ) : null
              }
            </div>

            <button className="btn btn-primary" disabled={erroForm} type="submit" >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

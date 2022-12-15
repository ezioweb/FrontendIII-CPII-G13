import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useTheme } from "../../Hooks/useTheme";
import { ctdUrl } from "../../urls";
import styles from "./Form.module.scss";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [erroUserName, setErroUserName] = useState(false);
  const [erroPassword, setErroPassword] = useState();
  const [erroForm, setErroForm] = useState(false);
  const mySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const { theme } = useTheme();
  const { setToken } = useAuth();

  //UserEffect para validar formulário
  function validationUser(event) {
    if (userName.length < 6) {
      setErroForm(true);
      setErroUserName(true);
      return true;
    } else if (userPassword === "" || userPassword.length < 8) {
      setErroForm(true);

      setErroPassword(true);
      return true;
    } else {
      setErroForm(false);
      setErroUserName(false);
      setErroPassword(false);
      return false;
    }
  }

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault();

    const userData = {
      username: userName,
      password: userPassword,
    };

    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestConfig = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(userData),
    };

    fetch(`${ctdUrl}auth`, requestConfig).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          mySwal.fire({
            text: "Login realizado com sucesso",
            icon: "success",
            position: "center",
            showConfirmButton: true,
          });
        });

        navigate("home");
      } else {
        mySwal.fire({
          text: 'Verifique suas informações novamente, usuário ou senha incorreto.',
          icon: 'error',
          position: 'center',   
          showConfirmButton: true,       
        })
      }
    });
  };

  // voltar ao normal apos o erro no servidor


  useEffect(() => {
    if (erroUserName || erroPassword) {
      setErroUserName(false);
      setErroPassword(false);
    }
  }, [userName, userPassword]);

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card} ${
          theme === "dark" ? styles.cardDark : "light"
        }`}
      >
        <div className={`card-body `}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={`form-control ${styles.inputSpacing} ${
                  erroUserName ? "erroForm" : ""
                } `}
                placeholder="Login"
                name="login"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                onBlur={validationUser}
              />

              {erroUserName ? (
                <span className="erroForm">
                  O campo <strong>login</strong> deve conter no mínimo 5
                  caracteres
                </span>
              ) : null}

              <input
                className={`form-control ${styles.inputSpacing} ${
                  erroPassword ? "erroForm" : ""
                } `}
                placeholder="Password"
                name="password"
                type="password"
                required
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
                onBlur={validationUser} 
              />

              {erroPassword ? (
                <span className="erroForm">
                  <p>
                    {" "}
                    O Campo <strong>password</strong> deve conter:
                  </p>
                  <li>No mínimo 8 caracteres</li>
                  <li>Ser alfanúmerico</li>
                </span>
              ) : null}
             
            </div>

            <button
              className={`btn btn-primary ${
                erroForm ? "erroForm disabled" : ""
              }`}
             type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

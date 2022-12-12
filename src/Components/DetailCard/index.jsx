import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import ScheduleFormModal from "../ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { ctdUrl } from "../../urls";

const DetailCard = () => {
  const { theme } = useTheme()
  const [dentistaData, setDentistaData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    fetch(`${ctdUrl}dentista?matricula=${id}`)
      .then((response) => response.json()
      .then((data) => setDentistaData(data))
      );
  }, [id]);
  return (
    <>
      <h1>Detail about Dentist {dentistaData.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        <div
          className={`${theme === 'dark'? styles.cardDark : ''} card-body row`}  
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentistaData.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentistaData.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {dentistaData.usuario && dentistaData.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;

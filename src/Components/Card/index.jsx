import styles from "./Card.module.css";

const Card = (props) => {
  console.log(props);

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}

          <a href={`/dentist/MatriculaDoDentista`}>
            <h5
              className={`card-title ${styles.title}`}
            >{`${props.dentista.nome} ${props.dentista.sobrenome}`}</h5>
            <h6>{props.dentista.matricula}</h6>
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;

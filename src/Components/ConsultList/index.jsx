import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import styles from "./ConsultList.module.css";
import { ctdUrl } from "../../urls";

const ConsultList = () => {
  const { theme } = useTheme();
  const [dentistaData, setDentistaData] = useState([]);
  const [consultaData, setConsultaData] = useState([]);
  const { id } = useParams();

  function dataConvert(isoData){    
    return new Intl.DateTimeFormat('pt-BR'
    ).format(new Date(isoData))
  }

  function horaConvert(isoData){
    const date = new Date(isoData)    
    return `${date.getHours()}:${date.getMinutes()}`
  }
 
  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    fetch(`${ctdUrl}dentista?matricula=${id}`).then((response) =>
      response.json().then((data) => setDentistaData(data))
    );
    fetch(`${ctdUrl}consulta?matricula=${id}`).then((response) =>
      response.json().then((data) => setConsultaData(data))
    );
  }, [id]);
  return (
    <>
      <h1>
        Consultas do dentista:{" "}
        {`${dentistaData.nome} ${dentistaData.sobrenome}`}{" "}
      </h1>
      <section className="card col-sm-12 col-lg-6 container">
        <div
          className={`${theme === "dark" ? styles.cardDark : ""} card-body row`}
        >
          <div className="col-sm-12 col-lg-12">
            <table>
              <thead>
                <tr>                  
                  <th>Nome completo</th>
                  <th>Data da consulta</th> 
                  <th>Hora da consulta</th> 
                                
                </tr>
              </thead>
              <tbody>
                {consultaData.map((consulta) => {
                  return (
                    <tr>
                      <td>{`${consulta.paciente.nome} ${consulta.paciente.sobrenome}`}</td>
                      {/* <td>{consulta.dataHoraAgendamento.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td> */}
                      <td>{dataConvert(consulta.dataHoraAgendamento)}</td>
                      <td>{horaConvert(consulta.dataHoraAgendamento)}</td>                      
                     
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>                 
        </div>
      </section>      
    </>
  );
};

export default ConsultList;

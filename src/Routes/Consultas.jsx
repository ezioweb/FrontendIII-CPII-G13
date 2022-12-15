import { useEffect, useState } from "react";
import CardConsult from "../Components/CardConsult";
import { ctdUrl } from "../urls";

const Consultas = () => {
  const [dentistaData, setDentistaData] = useState([]);

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    fetch(`${ctdUrl}${"dentista"}`).then((response) =>
      response.json().then((data) => {
        setDentistaData(data);        
      })
    );
  }, []);

  return (
    <>
      <h1>Consultas</h1>
      <h4>Selecione o dentista para ver suas consultas marcadas</h4>
      <div className="card-grid container">
        {/* Tudo que está abaixo deve ir para o Card */}
        {dentistaData.map((dentistaCard) => {
          return <CardConsult key={dentistaCard.matricula} dentista={dentistaCard} />;
        })}
      </div>
    </>
  );
};

export default Consultas;
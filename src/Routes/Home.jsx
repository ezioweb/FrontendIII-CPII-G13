import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { ctdUrl } from "../urls";

const Home = () => {

  const [dentistaData, setDentistaData] = useState([]);

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    fetch(`${ctdUrl}${'dentista'}`).then(
      response => response.json().then((data) => {
        setDentistaData(data);
        console.log(data);
      })
    );
  }, []);



  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        <Card />
        {/* Tudo que está abaixo deve ir para o Card */}
        {dentistaData.map((item) => (
        <div className="card-grid container" 
        key={item.matricula}>
          <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"/>
           <a href={`/dentist/MatriculaDoDentista`}>{item.matricula}
           <h5 className={`card-title`}>{item.nome}</h5>
           </a>                 
        </div>        
      ))}
      </div>      
    </>
  );
};

export default Home;

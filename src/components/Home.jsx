import { Horarios } from "./Horarios";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VerifyPlaca from "./VerifyPlaca";
import styles from "./styles/home.module.css";
function Home() {
  const [restriction, setRestriction] = useState([]);

  const getRestrictions = async () => {
    const apiInfo = await axios.get(
      "https://picoplaca-jb.herokuapp.com/api/horapico"
    );
    const data = apiInfo.data.map((el) => el);
    setRestriction(data);
  };
  useEffect(() => {
    getRestrictions();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Pico Y Placa</h1>
      <h2>Horarios de Restriccion</h2>
      <section className={styles.cardContainer}>
        {restriction.map((el) => {
          return (
            <Horarios
              key={el._id}
              id={el._id}
              dia={el.dia}
              placa1={el.placaUno}
              placa2={el.placaDos}
              hinicio={el.hora_inicio}
              hfin={el.hora_fin}
            />
          );
        })}
      </section>

      <Link to={"/create"}>
        <button className={styles.btn}>Crear Restriccion</button>
      </Link>

      <VerifyPlaca />
    </div>
  );
}

export default Home;

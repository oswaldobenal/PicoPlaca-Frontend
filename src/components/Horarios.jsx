import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles/horario.module.css";

export const Horarios = ({ dia, placa1, placa2, hinicio, hfin, id }) => {
  const handleClick = async (e) => {
    await axios
      .delete(`http://localhost:5000/api/restriction/${id}`)
      .then((res) => alert(res.request.response));
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <h3>{dia}</h3>
      <h5>{`No circulan: ${placa1} - ${placa2}`}</h5>
      <p>{`${hinicio} - ${hfin}`}</p>
      <Link to={`/edit/${id}`}>
        <span className={styles.btnEdit}>Edit</span>
      </Link>
      <button className={styles.btnEdit} onClick={handleClick}>
        Eliminar
      </button>
    </div>
  );
};

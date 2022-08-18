import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/form.module.css";

export const Edit = ({ dia, placa1, placa2, hinicio, hfin, id }) => {
  const [data, setData] = useState({
    placaUno: "",
    placaDos: "",
    hora_inicio: "",
    hora_fin: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:5000/api/horapico/${id}`, {
          placaUno: data.placaUno.length ? data.placaUno : placa1,
          placaDos: data.placaDos.length ? data.placaDos : placa2,
          hora_inicio: data.hora_inicio.length ? data.hora_inicio : hinicio,
          hora_fin: data.hora_fin.length ? data.hora_fin : hfin,
        })
        .then((res) => alert(res.request.response));
      navigate("/");
    } catch (error) {
      alert(error.request.response);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Restriccion</h2>
        <h3>Dia</h3>
        <h4>{dia}</h4>

        <h3>Placa 1</h3>
        <h4>{placa1}</h4>
        <label htmlFor="editP1">Numero Placa</label>
        <input
          className={styles.input}
          onChange={handleInput}
          type="text"
          id="editP1"
          name="placaUno"
          value={data.placaUno}
          placeholder="Ingrese el ultimo digito de la placa"
        />

        <h3>Placa 2</h3>
        <h4>{placa2}</h4>
        <label htmlFor="editP2">Numero Placa</label>
        <input
          className={styles.input}
          onChange={handleInput}
          type="text"
          id="editP2"
          name="placaDos"
          value={data.placaDos}
          placeholder="Ingrese el ultimo digito de la placa"
        />

        <h3>Hora de Inicio</h3>
        <h4>{hinicio}</h4>
        <label htmlFor="time">Nueva Hora de Inicio</label>
        <input
          className={styles.input}
          onChange={handleInput}
          type="time"
          id="time"
          name="hora_inicio"
        />

        <h3>Hora Fin</h3>
        <h4>{hfin}</h4>
        <label htmlFor="timeF">Nueva Hora de Finalizacion</label>
        <input
          className={styles.input}
          onChange={handleInput}
          type="time"
          id="timeF"
          name="hora_fin"
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </>
  );
};

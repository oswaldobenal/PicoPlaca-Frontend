import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "./Errors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles/form.module.css";

const CreateRestriction = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          dia: "",
          placaUno: "",
          placaDos: "",
          hora_inicio: "",
          hora_fin: "",
        }}
        validate={(valores) => {
          let errors = {};
          if (!valores.dia.length) {
            errors.dia = "Seleccione un dia";
          }

          if (!/^[0-9]\D*\d{0}$/.test(valores.placaUno)) {
            errors.placaUno = "Ingrese un numero del 0 al 9";
          }
          //Validar Placa Dos
          if (!/^[0-9]\D*\d{0}$/.test(valores.placaDos)) {
            errors.placaDos = "Ingrese un numero del 0 al 9";
          }

          // validar horas
          if (!valores.hora_inicio) {
            errors.hora_inicio = "Ingrese la hora de inicio";
          }

          if (!valores.hora_fin) {
            errors.hora_fin = "Ingrese la hora de finalizacion";
          }
          return errors;
        }}
        onSubmit={async (valores, { resetForm }) => {
          try {
            await axios
              .post("https://picoplaca-jb.herokuapp.com/api/horapico", valores)
              .then((res) => alert(res.request.response));
            navigate("/");
          } catch (error) {
            alert(error.request.response);
          }
        }}
      >
        {({ errors }) => (
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <Field className={styles.select} as="select" name="dia" id="dia">
                <option value="">Seleccione Dia</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
              </Field>
              <ErrorMessage
                name="dia"
                component={() => <div>{errors.dia}</div>}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="placaUno">Numero Placa 1</label>
              <Field
                className={styles.inputCreate}
                type="text"
                name="placaUno"
                id="placaUno"
                placeholder="Ultimo digito Placa."
              />
              <ErrorMessage
                name="placaUno"
                component={() => <Error err={errors.placaUno} />}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="placaDos">Numero Placa 2</label>
              <Field
                className={styles.inputCreate}
                type="text"
                name="placaDos"
                id="placaDos"
                placeholder="Ultimo digito Placa."
              />
              <ErrorMessage
                name="placaDos"
                component={() => <Error err={errors.placaDos} />}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="hora_inicio">Hora Inicio</label>
              <Field
                className={styles.inputCreate}
                type="time"
                name="hora_inicio"
                id="hora_inicio"
              />
              <ErrorMessage
                name="hora_inicio"
                component={() => <Error err={errors.hora_inicio} />}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="hora_inicio">Hora Finalizacion</label>
              <Field
                className={styles.inputCreate}
                type="time"
                name="hora_fin"
                id="hora_fin"
              />
              <ErrorMessage
                name="hora_fin"
                component={() => <Error err={errors.hora_fin} />}
              />
            </div>
            <button type="submit">Crear</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateRestriction;

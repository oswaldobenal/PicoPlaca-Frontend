import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./styles/form.module.css";
// import { useState } from "react";

const VerifyPlaca = () => {
  // const [validation, setValidation] = useState(false);
  return (
    <>
      <h2>Verifica si tu vehiculo puede circular!</h2>
      <Formik
        initialValues={{
          placa: "",
          dia: "",
        }}
        validate={(valores) => {
          let errors = {};

          //validacion placa
          if (!valores.placa) {
            errors.placa = "Porfavor Ingrese Una Placa";
          } else if (!/^[a-zA-Z]{3}[0-9]\D*\d{3}$/.test(valores.placa)) {
            errors.placa = "Ingrese una Placa Valida 3 Letras y 4 Numeros";
          }

          //validacion dia
          if (!valores.dia) {
            errors.dia = "Seleccione un dia!";
          }
          return errors;
        }}
        onSubmit={async (valores, { resetForm }) => {
          try {
            await axios
              .post("https://picoplaca-jb.herokuapp.com/api/verify", valores)
              .then((res) => alert(res.request.response));
            // setValidation(false);
            resetForm();
          } catch (error) {
            resetForm();
            return alert(error.request.response);
          }
        }}
      >
        {({ errors }) => (
          <Form className={styles.form}>
            <div>
              <label htmlFor="placa">Placa</label>
              <Field
                className={styles.input}
                type="text"
                name="placa"
                id="placa"
                placeholder="PQJ0123"
              />
              <ErrorMessage
                name="placa"
                component={() => <div>{errors.placa}</div>}
              />
            </div>
            <div>
              <Field className={styles.select} as="select" name="dia">
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
            <button type="submit">Verificar</button>
            {/* {validation && <p>Seleccione un dia!</p>} */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VerifyPlaca;

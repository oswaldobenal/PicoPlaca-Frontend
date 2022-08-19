import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "./Edit";

export const EditHorario = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const getDetail = async (id) => {
    const apiData = await axios.get(
      `https://picoplaca-jb.herokuapp.com/api/detail/${id}`
    );
    setData(apiData.data);
  };
  useEffect(() => {
    getDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {
        <Edit
          key={data.id}
          id={id}
          dia={data.dia}
          placa1={data.placaUno}
          placa2={data.placaDos}
          hinicio={data.hora_inicio}
          hfin={data.hora_fin}
        />
      }
    </>
  );
};

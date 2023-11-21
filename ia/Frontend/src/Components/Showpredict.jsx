import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const Showpredict = forwardRef((props, ref) => {
  const [latestData, setLatestData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/fruits/show"
      );
      const responseData = response.data;

      // Obtener el último elemento del array y actualizar el estado si hay una nueva predicción
      if (responseData.length > 0) {
        const lastData = responseData[responseData.length - 1];
        setLatestData(lastData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Realiza la llamada inicial al montar el componente

  useImperativeHandle(ref, () => ({
    updateData() {
      fetchData();
    },
  }));

  return (
    <div>
      <h2>Te prediction of your image is:</h2>
      {latestData ? <p>{latestData.prediction}</p> : <p>your prediction will show here</p>}
    </div>
  );
});

export default Showpredict;
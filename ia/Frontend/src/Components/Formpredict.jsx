import React, { useState } from "react";
import "./Formpredict.css";
import axios from "axios";

const Formpredict = ({ showPredictRef }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/predict", formData);

        if (response.status === 200) {
          // Actualizar los datos en Showpredict
          showPredictRef.current.updateData();
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <form
        className="pred_form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="file">Insert image to predict here:</label>
        <br />
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <br />
        <button type="submit">Predecir</button>
      </form>
    </div>
  );
};

export default Formpredict;
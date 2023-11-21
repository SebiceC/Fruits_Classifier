import React, { useRef } from "react";
import Formpredict from "./Components/Formpredict";
import Showpredict from "./Components/Showpredict";
import "./App.css"
const MainComponent = () => {
  const showPredictRef = useRef(null);

  return (
    <>
    <h1 className="glow">Fruits Classifier</h1>
    <div>
      <Formpredict showPredictRef={showPredictRef} />
      <Showpredict ref={showPredictRef} />
    </div>
    </>
  );
};

export default MainComponent;

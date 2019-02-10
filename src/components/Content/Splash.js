import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../assets/sketch";

const Splash = ({ loading }) => {
  return (
    <div className={`Splash ${loading ? "loading" : "loaded"}`}>
      <P5Wrapper sketch={sketch} />
      <div className="hover">
        <h1>Welkom op</h1>
        <h1>Max Altena's</h1>
        <h1>Smart Mobile</h1>
        <h1>portfolio!</h1>
      </div>
    </div>
  );
};

export default Splash;

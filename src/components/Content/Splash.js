import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../assets/sketch";

const Splash = () => {
  return (
    <div className="Splash">
      <P5Wrapper sketch={sketch} />
    </div>
  );
};

export default Splash;

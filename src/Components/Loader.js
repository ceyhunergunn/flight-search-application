import React from "react";
import city from "../Assets/city.png";
import plane from "../Assets/plane.png";
const Loader = () => {
  return (
    <div className="search-area p-3 d-flex align-items-center">
      <img
        className="plane"
        src={plane}
        alt="plane"
        style={{
          width: "100px",
          height: "50px",
          position: "absolute",
          left: "0px",
        }}
      />
      <div className="city d-flex align-items-center justify-content-center">
        <img src={city} alt="city" style={{ width: "75%", height: "50%" }} />
      </div>
    </div>
  );
};

export default Loader;

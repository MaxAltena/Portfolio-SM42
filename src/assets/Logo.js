import React from "react";

const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 50"
      className="Logo"
    >
      <g className="M">
        <path d="M29.5,8h-5L19,31.4L13.5,8h-5l8,34h5L29.5,8z" />
        <path d="M31.5,8l-3,12.8V42h5V8H31.5z" />
        <path d="M6.5,8h-2v34h5V20.8L6.5,8z" />
      </g>
      <g className="A">
        <path d="M44.5,8h-5l-11,34h5L44.5,8z" />
        <path d="M44.6,30h-5.2l-1.3,4h7.8L44.6,30z" />
        <path d="M39.5,8h5l11,34h-5L39.5,8z" />
      </g>
      <g className="X">
        <path d="M53,8h2.5l-7,13H46L53,8z" />
        <g>
          <path d="M52.5,15.4l-1.2,2.4L53,21h2.5L52.5,15.4z" />
          <path d="M49,13.6l1.3-2.3L48.5,8H46L49,13.6z" />
        </g>
      </g>
    </svg>
  );
};

export default Logo;

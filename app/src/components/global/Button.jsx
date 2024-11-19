import React from 'react';


const Button = ({ text, color, onClick, className, width, border , type, padding, margin, fontSize, style}) => {
 
  return (
    <button type={type} className={`custom-button ${className}`} style={{ backgroundColor: color , width: width, borderRadius: border, padding: padding, margin: margin, fontSize: fontSize, ...style}} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;


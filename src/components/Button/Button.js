import React from "react";
import "./Button.css";

const Button = ({ children, onClick, type, className }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

import React from "react";
import "./InputField.css";

const InputField = ({
    label,
    className,
    type,
    value,
    onChange,
    name,
    onBlur,
    error,
}) => {
    const labelExtraClass = value ? "input-field__label_active" : "";
    const fieldExtraClass = error ? "input-field__label_error" : "";

    return (
        <div className={`input-field ${fieldExtraClass} ${className}`}>
            <input
                className="input-field__item"
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
            />
            <label className={`input-field__label ${labelExtraClass}`}>
                {label}
            </label>
            <div className="input-field__error">{error}</div>
        </div>
    );
};

export default InputField;

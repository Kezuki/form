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
    const labelExtraClass = value ? "input-field__label-text_active" : "";
    const fieldExtraClass = error ? "input-field__label-text_error" : "";

    return (
        <div className={`${className} input-field ${fieldExtraClass}`}>
            <label className={`input-field__label `}>
                <input
                    className="input-field__item"
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                />
                <div className={`input-field__label-text ${labelExtraClass}`}>
                    {label}
                </div>
            </label>
            <div className="input-field__error">{error}</div>
        </div>
    );
};

export default InputField;

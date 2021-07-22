import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import "./SignUp.css";

// проверка значений input
const validator = (value, validationFields, checked) => {
    const errors = {};

    console.log(!!value);

    for (const validation in validationFields) {
        switch (validation) {
            case "emptyError":
                !value.replace(/\s/g, "") && checked
                    ? (errors[validation] = "Поле не может быть пустым")
                    : (errors[validation] = false);
                break;

            case "nameError":
                !/^[а-яА-Я-]+\s+[а-яА-Я-]+((\s[а-яА-Я-]+)?)+/.test(
                    value.trim()
                ) && checked
                    ? (errors[validation] =
                          "Поле должно содержать 2 слова, написанных кириллицей")
                    : (errors[validation] = false);
                break;

            case "emailError":
                !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
                    value.trim()
                ) && checked
                    ? (errors[validation] = "Некорректный email")
                    : (errors[validation] = false);
                break;

            case "phoneError":
                !/^$|^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(
                    value.trim()
                ) && checked
                    ? (errors[validation] = "Недопустимый формат номера")
                    : (errors[validation] = false);
                break;
        }
    }

    return errors;
};

const SignUpForm = ({ initialData, onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [checkPassed, setCheckPassed] = useState(false);

    useEffect(() => {
        console.log("init");

        if (checkPassed) {
            const finalData = {};

            // группировка элементов перед отправкой
            data.forEach((el) => {
                if (el.value !== "") {
                    if (finalData[el.name] === undefined) {
                        finalData[el.name] = el.value;
                    } else {
                        finalData[el.name] = `${finalData[el.name]}, ${
                            el.value
                        }`;
                    }
                }
            });
            console.log(finalData);
            onSubmit(finalData);
        }
    }, [checkPassed]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const updateDataValue = (idx) => (e) => {
        setData((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));

            newState[idx].value = e.target.value;

            const errors = validator(
                e.target.value,
                newState[idx].errors,
                newState[idx].checked
            );

            newState[idx].errors = errors;
            return newState;
        });
    };

    const updateDataChecked = (idx) => (e) => {
        setData((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));

            newState[idx].checked = true;

            const errors = validator(
                e.target.value,
                newState[idx].errors,
                true
            );

            newState[idx].errors = errors;
            return newState;
        });
    };

    const validateAllInputs = () => {
        setData((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));
            const newData = newState.map((el) => {
                const errors = validator(el.value, el.errors, true);
                el.checked = true;
                el.errors = errors;
                return el;
            });

            let arrayOfErrors = newData.map((el) => {
                return Object.values(el.errors);
            });

            arrayOfErrors = [...new Set(arrayOfErrors.flat())];

            if (arrayOfErrors.length === 1 && arrayOfErrors[0] === false) {
                setCheckPassed(true);
            }

            return [...newData];
        });
    };

    const addInput = (inputObj) => {
        setData((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));
            newState.push(inputObj);
            return newState;
        });
    };

    const inputs = data.map(({ label, type, value, errors, name }, idx) => {
        return (
            <InputField
                className="sign-up__input-field"
                key={idx}
                label={label}
                name={name}
                type={type}
                value={value}
                error={Object.values(errors).find((el) => !!el)}
                onChange={updateDataValue(idx)}
                onBlur={updateDataChecked(idx)}
            />
        );
    });

    return (
        <>
            <h2 className="sing-up__title">Регистрация</h2>
            <form className="sing-up__form" onSubmit={handleSubmit}>
                {inputs}

                <div className="sing-up__buttons">
                    <Button
                        className="button button_plus"
                        onClick={() => {
                            addInput({
                                label: "Дополнительный номер телефона",
                                type: "tel",
                                name: "phone",
                                value: "",
                                extraPhone: "",
                                checked: false,
                                errors: {
                                    phoneError: false,
                                },
                            });
                        }}
                    ></Button>

                    <Button
                        className="button button_green"
                        onClick={validateAllInputs}
                        type="submit"
                    >
                        Отправить
                    </Button>
                </div>
            </form>
        </>
    );
};

const SignUpFinal = ({ data: { name, email, phone } }) => {
    return (
        <div className="sing-up__final">
            <h2 className="sing-up__title">Вы зарегистрированы</h2>
            <div className="sing-up__final-title">Имя и фамилия </div>
            <div className="sing-up__final-item"> {name}</div>
            <div className="sing-up__final-title">Email </div>
            <div className="sing-up__final-item"> {email}</div>
            <div className="sing-up__final-title">Номер телефона </div>
            <div className="sing-up__final-item"> {phone}</div>
        </div>
    );
};

const SignUp = ({ initialData }) => {
    const [dateForSend, setDateForSend] = useState(null);

    const onSubmit = (e) => {
        setDateForSend(e);
    };

    const render = dateForSend ? (
        <SignUpFinal data={dateForSend} />
    ) : (
        <SignUpForm initialData={initialData} onSubmit={onSubmit} />
    );

    return <div className="sign-up">{render}</div>;
};

export default SignUp;

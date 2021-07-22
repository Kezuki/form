import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";
import "./App.css";

const initialData = [
    {
        label: "Имя и фамилия",
        type: "text",
        name: "name",
        value: "",
        checked: false,
        errors: {
            emptyError: false,
            nameError: false,
        },
    },

    {
        label: "Email",
        type: "text",
        name: "email",
        value: "",
        checked: false,
        errors: {
            emptyError: false,
            emailError: false,
        },
    },

    {
        label: "Номер телефона",
        type: "tel",
        name: "phone",
        value: "",
        checked: false,
        errors: {
            emptyError: false,
            phoneError: false,
        },
    },
];
function App() {
    return (
        <>
            <div className="bgi"></div>
            <main className="main-page">
                <div className="container">
                    <div className="main-page__form">
                        <SignUp initialData={initialData} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
